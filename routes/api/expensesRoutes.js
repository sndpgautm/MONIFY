'use strict';
const express = require('express');
const router = express.Router();
const expenseController = require('../../controllers/expenseController');
const passport = require('passport');

// @route GET api/expenses
// @desc Get all expense data for current user
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  expenseController.expense_list_all
);

// @route GET api/expenses/:id
// @desc Get expense data by id
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  expenseController.expense_update_get
);

// @route POST api/expenses
// @desc Create expense
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  expenseController.expense_create_post
);

// @route POST api/expenses/:id
// @desc Update expense
// @access Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  expenseController.expense_update_post
);

// @route DELETE api/expenses/:id
// @desc Delete expense
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  expenseController.expense_remove_delete
);

module.exports = router;
