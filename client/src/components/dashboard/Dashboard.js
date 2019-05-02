import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentExpenses,
  reqForChartData
} from '../../actions/expenseActions';
import ExpenseFeed from '../expenses/ExpenseFeed';
import Spinner from '../common/Spinner';
import DoughnutChart from '../charts/DoughnutChart';

class Dashboard extends Component {
  state = {
    dataForChart: []
  };

  componentDidMount() {
    this.props.reqForChartData();
    this.props.getCurrentExpenses();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.expense.expensesByCategory !== prevState.dataForChart) {
      return {
        dataForChart: nextProps.expense.expensesByCategory
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    // Data for doughnut chart
    const chartData = {
      labels: [
        'Food & Drinks',
        'Shopping',
        'Housing',
        'Transportation',
        'Leisure',
        'Others'
      ],
      datasets: [
        {
          label: 'Expenses',
          data: this.state.dataForChart,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }
      ]
    };

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
            <DoughnutChart chartData={chartData} />
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
            {/*<div className="col-md-5">
              <h1 className="display-4">ToDo:Chartjs</h1>
             </div>*/}
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
  { getCurrentExpenses, reqForChartData }
)(Dashboard);
