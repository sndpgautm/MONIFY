import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseFeed from './ExpenseFeed';
import Spinner from '../common/Spinner';
import { getCurrentExpenses } from '../../actions/expenseActions';

class Expenses extends Component {
  componentDidMount() {
    this.props.getCurrentExpenses();
  }

  render() {
    const { expenses, loading } = this.props.expense;
    let expenseContent;

    if (expenses == null || loading) {
      expenseContent = <Spinner />;
    } else {
      expenseContent = <ExpenseFeed expenses={expenses} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{expenseContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Expenses.propTypes = {
  getCurrentExpenses: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  expense: state.expense
});

export default connect(
  mapStateToProps,
  { getCurrentExpenses }
)(Expenses);
