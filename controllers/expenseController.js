'use strict';

const mongoose = require('mongoose');

// Load Expense Model
const Expense = require('../models/Expense');
// Load User Model
const User = require('../models/User');

// Load Input Validation
const validateExpenseInput = require('../validation/expense');

// Return List of all Expenses
exports.expense_list_all = (req, res) => {};

// Handle Expense Create on POST
exports.expense_create_expense = (req, res) => {
  const { errors, isValid } = validateExpenseInput.validateExpenseInput(
    req.body
  );
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  const newExpense = new Expense({
    user: req.user.id,
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date
  });

  newExpense.save().then(expense => {
    console.log(expense.amount);
    // Need to fix amount on client side (amount/100).toFixed(2) for original format eg. $120.50
    res.json(expense);
  });
};
