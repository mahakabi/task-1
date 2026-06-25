const express = require('express');
const app = express();
const port = 3000;
const path = require('path'); // Used in sendFile()

app.set('view engine', 'ejs');

// Router
const usersRouter = require('./routes/users'); // Router from users.js

// Thir Part Middleware
const morgan = require('morgan');

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
    console.log(`${req.method} ${req.url}`);
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

app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(500).send('Internal Server Error');
});

/**
 * ===
 * Server
 * ===
 */

app.listen(port, () => {
    console.log(`Example app listening on port ${port}\n`);
});