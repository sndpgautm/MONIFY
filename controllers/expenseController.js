'use strict';

const mongoose = require('mongoose');

// Load Expense Model
const Expense = require('../models/Expense');
// Load User Model
const User = require('../models/User');

// Load Input Validation
const validateExpenseInput = require('../validation/expense');

// Return List of all Expenses
exports.expense_list_all = (req, res) => {
  Expense.find()
    .sort({ date: -1 })
    .then(expenses => res.json(expenses))
    .catch(err =>
      res.status(404).json({ noexpensesfound: 'No expenses found' })
    );
};

// Return Expense by ID on GET
exports.expense_update_get = (req, res) => {
  Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(err =>
      res.status(404).json({ noexpensefound: 'No expense found by that ID' })
    );
};

// Handle Expense Create on POST
exports.expense_create_post = (req, res) => {
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

// Handle Expense Update on POST
exports.expense_update_post = (req, res) => {
  const { errors, isValid } = validateExpenseInput.validateExpenseInput(
    req.body
  );
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  const expenseFields = {
    user: req.user.id,
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date
  };

  Expense.findOneAndUpdate(
    { _id: req.params.id },
    { $set: expenseFields },
    { new: true }
  ).then(expense => res.json(expense));
};

// Handle expense delete on DELETE
exports.expense_remove_delete = (req, res) => {
  User.findById(req.user.id).then(user => {
    Expense.findById(req.params.id)
      .then(expense => {
        // Check for expense data owner so that any other users cannot delete data
        if (expense.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'User not authorized to perform delete' });
        }

        // Delete
        expense.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ expensenotfound: 'No expense found' })
      );
  });
};
