const express = require('express');
const app = express();
const port = 3000;
const path = require('path'); // Used in sendFile()

app.set('view engine', 'ejs');
app.set('trust proxy', true);

// Router
const usersRouter = require('./routes/users'); // Router from users.js

// Database
const { users, getUserById } = require('./database/users');

// Third Party Middleware
const morgan = require('morgan');
const { nextTick } = require('process');

// Debuggers
const debug = require('debug')('app');
const debugRoutes = require('debug')('app');
const debugMiddleware = require('debug')('app');

/**
 * ===
 * Functions
 * ===
 */

function logRequest(req, res, next) {
    console.log('Request Received');
    next();
}

function sendResponse(req, res) {
    res.send('Route handler completed');
}

// Custom middleware function global
function requestLogger(req, res, next) {
    debugMiddleware(`Incoming request: ${req.method} ${req.url}`);
    next();
}

// Custom middleware function targeted
function checkAccess(req, res, next) {
    console.log('Checking Access');
    next();
}

// Middleware chain 1
function firstMiddleware(req, res, next) {
    console.log('First Middleware');
    next();
}

// Middleware chain 2
function secondMiddleware(req, res, next) {
    console.log('Second Middleware');
    next();
}

// Passing control test (next() inside conditions)
function checkQuery(req, res, next) {
    if (req.query.admin === 'true') {
        next();
        return;
    }

    res.status(403).send('Admin access required');
}

function orderOne(req, res, next) {
    console.log('Order 1');
    next();
}

function orderTwo(req, res, next) {
    console.log('Order Two');
    next();
}

function flowOne(req, res, next) {
    debugMiddleware('flowOne');
    next();
}

function flowTwo(req, res, next) {
    debugMiddleware('flowTwo');
    next();
}

/**
 * ===
 * Middleware
 * ===
 */

// Custom function global usage
app.use(requestLogger);

// Global middleware flow test
app.use((req, res, next) => {
    console.log('Middleware flow test');
    next();
});

// Router usage
app.use('/users', usersRouter);

// Path specific middleware
app.use('/admin-area', (req, res, next) => {
    console.log('Admin Area Middleware');
    next();
});

// Express specific middleware
// JSON Parse
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Static files
app.use(express.static('public'));

// Third party middleware
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.success = function(data) {
        this.json({
            success: true,
            data
        });
    };

    res.fail = function(message) {
        this.status(400).json({
            success: false,
            error: message
        });
    };

    next();
});

app.use((req, res, next) => {
    req.currentUser = {
        id: 1,
        name: 'Hamzah'
    };

    next();
});

/**
 * ===
 * Routes
 * ===
 */

//
// P1
//

// GET request to homepage
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// About Page
app.get('/about', (req, res) => {
    debugRoutes('About route visited');
    res.send('About Page');
});

// Contact Page
app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

// User profiles
app.get('/users/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

// Products with Reviews
app.get('/products/:productId/reviews/:reviewId', (req, res) => {
    res.send(`Product: ${req.params.productId}, Reviews: ${req.params.reviewId}`);
});

// Handler functions test
app.get('/handler-demo', logRequest, sendResponse);

//
// P2
//

// JSON web test
app.get('/request-info', (req, res) => {
    res.json({
        method: req.method,
        url: req.url,
        ip: req.ip
    });
});

// Status & JSON web test
app.get('/success', (req, res) => {
    res.status(200).json({
        message: 'Success'
    });
});

// Specified middleware usage test
app.get('/protected', checkAccess, (req, res) => {
    res.send('Protected Route');
});

// Specified middleware chain test
app.get('/chain', firstMiddleware, secondMiddleware, (req, res) => {
    res.send('Middleware chain test');
});

// Passing control middleware test
app.get('/admin', checkQuery, (req, res) => {
    res.send('Welcome Admin');
});

// Error test
app.get('/error', (req, res, next) => {
    const error = new Error('Something went wrong');
    next(error);
});

//
// P3
//

// Path specific middleware
app.get('/admin-area/dashboard', (req, res) => {
    res.send('Admin Dashboard');
});

// Test route
app.post('/user', (req, res) => {
    res.json({
        received: req.body
    });
});

app.post('/form', (req, res) => {
    res.json({
        recieved: req.body
    });
});

app.get('/order-demo', orderOne, orderTwo, (req, res) => {
    console.log('Route Handler');
    res.send('Order Demo Complete');
});

app.get('/test', (req, res) => {
    res.send('First Route');
});

app.get('/test', (req, res) => {
    res.send('Second Route');
});

//
// P4
//

app.get('/home', (req, res) => {
    res.render('pages/home', { 
        name: 'Hamzah',
        role: 'Intern',
        skills: ['Express', 'Node.js', 'JavaScript'],
        isAdmin: true
    });
});

app.get('/profile/:name', (req, res) => {
    res.render('pages/profile', {
        name: req.params.name
    });
});

app.get('/dashboard', (req, res) => {
    res.render('home', {
        name: req.query.name || 'Guest',
        role: 'User',
        skills: ['Express'],
        isAdmin: req.query.admin === 'true'
    });
});

//
// P5
//

app.get('/sync-error', (req, res) => {
    throw new Error('Synchronous Error');
});

app.get('/async-error', (req, res, next) => {
    setTimeout(() => {
        next(new Error('Async Error'));
    }, 1000);
});

app.get('/not-found', (req, res, next) => {
    const error = new Error('User not found');
    error.status = 404;

    next(error);
});

//
// P6
//

app.get('/debug-demo', (req, res) => {
    debug('Debug route visited');

    res.send('Debug Demo');
});

app.get('/env', (req, res) => {
    res.json({
        nodeEnv: process.env.NODE_ENV,
        debug: process.env.DEBUG
    });
});

app.get('/flow-demo', (req, res) => {
    debugRoutes('Flow demo route reached');

    res.send('Flow Demo');
});

app.get('/flow-chain', flowOne, flowTwo, (req, res) => {
    debugRoutes('Route Handler');
    res.send('Flow Chain');
});

//
// P7
//

app.get('/ip', (req, res) => {
    res.json({
        ip: req.ip
    });
});

app.get('/proxy-status', (req, res) => {
    res.json({
        trustProxy: app.get('trust proxy')
    });
});

app.get('/request-details', (req, res) => {
    res.json({
        ip: req.ip,
        protocol: req.protocol,
        secure: req.secure
    });
});

//
// P8
//

// Read
app.get('/db/users', (req, res) => {
    res.json(users);
});

// Read One from DB
app.get('/db/users/:id', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }
    res.json(user);
});

// Create
app.post('/db/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// Update
app.put('/db/users/:id', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    user.name = req.body.name;
    res.json(user);
});

// Delete
app.delete('/db/users/:id', (req, res) => {
    const index = users.findIndex(user => user.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    const deletedUser = users.splice(index, 1);
    res.json(deletedUser);
});

app.get('/async-users/:id', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

//
// P9
//

app.get('/override-demo', (req, res) => {
    res.json({
        message: 'Override Demo'
    });
});

app.get('/custom-response', (req, res) => {
    res.success({
        name: 'Hamzah',
        role: 'Intern'
    });
});

app.get('/current-user', (req, res) => {
    res.json(req.currentUser);
});

app.get('/helper-demo', (req, res) => {
    const validUser = false;

    if (!validUser) {
        return res.fail('User not found');
    }

    res.success({
        name: 'Hamzah'
    });
});


/**
 * ===
 * Response Methods
 * ===
 */

// Send
app.get('/send', (req, res) => {
    res.send('Hello from res.send()');
});

// JSON
app.get('/json', (req, res) => {
    res.json({
        name: 'Hamzah',
        role: 'Intern'
    });
});

// Status
app.get('/status', (req, res) => {
    res.status(404).send('Page not found');
});

// Redirect
app.get('/redirect', (req, res) => {
    res.redirect('/');
});

// Send File
app.get('/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hello.html'));
});

/**
 * ===
 * Error Middleware
 * ===
 */

// Simple error middleware
// app.use((err, req, res, next) => {
//     console.error(err.message);
//     res.status(err.status || 500).json({
//         error: err.message
//     });
// });

// Updated error middleware
app.use((err, req, res, next) => {
    console.error(err.message);

    if(process.env.NODE_ENV === 'development') {
        return res.status(err.status || 500).json({
            error: err.message,
            stack: err.stack
        });
    }

    res.status(err.status || 500).json({
        error: 'Internal Server Error'
    });
});

/**
 * ===
 * Server
 * ===
 */

app.listen(port, () => {
    console.log(`Example app listening on port ${port}\n`);
});