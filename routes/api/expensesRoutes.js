'use strict';
const express = require('express');
const router = express.Router();
const expenseController = require('../../controllers/expenseController');
const passport = require('passport');

// @route GET api/expenses/all
// @desc Get current users all expenses
// @access private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  expenseController.expense_list_all
);

// @route POST api/expenses
// @desc Create expense
// @access protected
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  expenseController.expense_create_expense
);

module.exports = router;
