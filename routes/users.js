const express = require('express');
const router = express.Router();

// GET /users
router.get('/', (req, res) => {
    res.send('Users Home');
});

// GET /users/profile
router.get('/profile', (req, res) => {
    res.send('User Profile');
});

module.exports = router;