import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteExpense } from '../../actions/expenseActions';

class ExpenseItem extends Component {
  onDeleteClick = id => {
    this.props.deleteExpense(id);
  };

  render() {
    const { expense } = this.props;
    const { date } = expense;
    const dateFormatted = new Date(date);

    return (
      <div className="card text-white bg-info mb-3">
        <div className="card-header">
          {dateFormatted.toDateString()}
          <button
            type="button"
            className="btn btn-danger mr-1"
            onClick={this.onDeleteClick.bind(this, expense._id)}
            style={{ cursor: 'pointer', float: 'right' }}
          >
            <i className="fas fa-times" />
          </button>
          <Link to={`/edit-expense/${expense._id}`}>
            <button
              type="button"
              className="btn btn-primary mr-1"
              style={{ cursor: 'pointer', float: 'right' }}
            >
              <i className="fas fa-pencil-alt" style={{ color: 'white' }} />
            </button>
          </Link>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <h2 className="card-title">{expense.amount}€</h2>
              <h3 className="text-left lead">{expense.category}</h3>
            </div>
            <div className="col-md-8">
              {/*<h3 className="text-left lead">Details</h3>*/}
              <p className="card-text">{expense.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExpenseItem.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteExpense }
)(ExpenseItem);
