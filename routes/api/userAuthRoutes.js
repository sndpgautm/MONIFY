'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const passport = require('passport');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', userController.user_create_post);

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', userController.user_login_get);

// @route   POST api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  userController.user_current_get
);

module.exports = router;
