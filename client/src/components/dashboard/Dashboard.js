import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentExpenses } from '../../actions/expenseActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentExpenses();
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default connect(
  null,
  { getCurrentExpenses }
)(Dashboard);
