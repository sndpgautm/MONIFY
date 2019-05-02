import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import {
  updateExpense,
  getCurrentExpenseById
} from '../../actions/expenseActions';

class EditExpense extends Component {
  state = {
    category: '',
    amount: '',
    description: '',
    errors: {}
  };

  componentDidMount() {
    // Getting id from route parameter
    const { id } = this.props.match.params;
    this.props.getCurrentExpenseById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.expense.expense) {
      const expense = nextProps.expense.expense;
      // Set component fields state
      this.setState({
        category: expense.category,
        amount: expense.amount,
        description: expense.description
      });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const newExpense = {
      category: this.state.category,
      amount: this.state.amount,
      description: this.state.description
    };

    const { id } = this.props.match.params;

    this.props.updateExpense(newExpense, id, this.props.history);

    // Clear State
    this.setState({
      category: '',
      amount: '',
      description: ''
    });
  };

  render() {
    const { errors } = this.state;
    // Select options for category
    const options = [
      { label: '* Select Expense Category', value: '' },
      { label: 'Food & Drinks', value: 'Food & Drinks' },
      { label: 'Shopping', value: 'Shopping' },
      { label: 'Housing', value: 'Housing' },
      { label: 'Transportation', value: 'Transportation' },
      { label: 'Leisure', value: 'Leisure' },
      { label: 'Others', value: 'Others' }
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Expense</h1>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={this.onSubmit.bind(this)}>
              <SelectListGroup
                name="category"
                placeholder="* Category"
                value={this.state.category}
                onChange={this.onChange}
                options={options}
                error={errors.category}
              />
              <TextFieldGroup
                placeholder="* Enter Amount"
                name="amount"
                type="text"
                value={this.state.amount}
                onChange={this.onChange}
                error={errors.amount}
              />
              <TextAreaFieldGroup
                name="description"
                placeholder="Enter Description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditExpense.propTypes = {
  getCurrentExpenseById: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expense: state.expense,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateExpense, getCurrentExpenseById }
)(withRouter(EditExpense));
