const express = require('express');
const router = express.Router();

// Functions
function profileCheck(req, res, next) {
    console.log('Profile Check');
    next();
}

// Middleware
router.use((req, res, next) => {
    console.log('Users Router Middleware');
    next();
});

// GET /users
router.get('/', (req, res) => {
    res.send('Users Home');
});

// GET /users/profile
router.get('/profile', profileCheck, (req, res) => {
    res.send('User Profile');
});

module.exports = router;