const express = require('express');
const app = express();
const port = 3000;

const path = require('path'); //Used in sendFile()
const usersRouter = require('./routes/users');


function logRequest(req, res, next) {
    console.log('Request Received');
    next();
}

function sendResponse(req, res){
    res.send('Route handler completed');
}

app.use('/users', usersRouter);

// GET request to homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Pages

// About Page
app.get('/about', (req,res) => {
    res.send('About Page');
});

//Contact Page
app.get('/contact', (req,res) => {
    res.send('Contact Page');
});

// User profiles
app.get('/users/:id', (req,res) => {
    res.send(`User ID: ${req.params.id}`);
});

// Products w Reviews
app.get('/products/:productId/reviews/:reviewId', (req,res) => {
    res.send(`Product: ${req.params.productId}, Reviews: ${req.params.reviewId}`);
})

app.get('/handler-demo', logRequest, sendResponse);

// Response Methods

//Send
app.get('/send', (req, res) => {
    res.send('Hello from res.send()');
});

// Json
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

// Send Files
app.get('/send', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hello.html'));
});

