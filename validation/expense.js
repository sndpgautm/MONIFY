'use strict';

const Validator = require('validator');
const isEmpty = require('./is-empty');

exports.validateExpenseInput = data => {
  let errors = {};
  // Check the data.textfield is null or undefined from req.body and converts to empty string if it is
  data.category = !isEmpty(data.category) ? data.category : '';
  data.amount = !isEmpty(data.amount) ? data.amount : '';

  if (!Validator.isCurrency(data.amount)) {
    errors.amount = 'Provide amount in format 302,950.58';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Amount field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
