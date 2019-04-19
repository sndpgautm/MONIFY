import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentExpenses } from '../../actions/expenseActions';
import ExpenseFeed from '../expenses/ExpenseFeed';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentExpenses();
  }
  render() {
    const { user } = this.props.auth;
    const { expenses, loading } = this.props.expense;

    let dashboardContent;

    if (expenses === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has expenses data
      if (expenses.length > 0) {
        dashboardContent = (
          <div>
            <h4>TODO: DISPLAY EXPENSES</h4>
            <ExpenseFeed expenses={expenses} />
          </div>
        );
      } else {
        // User is logged in but has no expenses
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not yet added your expenses, please add some of your
              expenses to get started
            </p>
            <Link to="/add-expense" className="btn btn-lg btn-info">
              Add Expense
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentExpenses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expense: state.expense,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentExpenses }
)(Dashboard);
