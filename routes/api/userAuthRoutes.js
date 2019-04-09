'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', userController.user_create_post);

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', userController.user_login_get);

module.exports = router;
