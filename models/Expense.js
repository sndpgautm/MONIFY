'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Bug getters do not work when returing json response
// Fixes the currency amount to format 102.55
const getAmount = amt => (amt / 100).toFixed(2);

// Create Schema
const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  amount: {
    type: Currency,
    required: true,
    get: getAmount
  },
  date: {
    type: Date,
    //required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('expense', ExpenseSchema);
