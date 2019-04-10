'use strict';

const Validator = require('validator');
const isEmpty = require('./is-empty');

exports.validateLoginInput = data => {
  let errors = {};
  // Check the data.textfield is null or undefined from req.body and converts to empty string if it is
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email field is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
