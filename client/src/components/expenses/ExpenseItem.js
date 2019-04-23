import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ExpenseItem extends Component {
  render() {
    const { expense } = this.props;
    const { date } = expense;
    const dateFormatted = new Date(date);

    return (
      <div className="card text-white bg-info mb-3">
        <div className="card-header">{dateFormatted.toDateString()}</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <h2 className="card-title">{expense.amount}€</h2>
              <h3 className="text-left lead">{expense.category}</h3>
            </div>
            <div className="col-md-8">
              <h3 className="text-left lead">Description</h3>
              <p className="card-text">{expense.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExpenseItem.propTypes = {
  expense: PropTypes.object.isRequired
};

export default connect(null)(ExpenseItem);
