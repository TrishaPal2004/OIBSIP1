const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');
var fetchuser = require('../middleware/fetchuser');
// Signup route
router.post('/',fetchuser, registerUser);

// Login route
router.post('/login',fetchuser, authUser);

module.exports = router;
