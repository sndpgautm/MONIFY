import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpenseItem from './ExpenseItem';

class ExpenseFeed extends Component {
  render() {
    const { expenses } = this.props;
    return expenses.map(expense => (
      <ExpenseItem key={expense._id} expense={expense} />
    ));
  }
}

ExpenseFeed.propTypes = {
  expenses: PropTypes.array.isRequired
};

export default ExpenseFeed;
