import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ExpenseItem extends Component {
  render() {
    const { expense } = this.props;
    return <div />;
  }
}

ExpenseItem.propTypes = {
  expense: PropTypes.object.isRequired
};

export default connect(null)(ExpenseItem);
