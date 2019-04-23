import axios from 'axios';

import {
  GET_EXPENSES,
  ADD_EXPENSE,
  GET_ERRORS,
  EXPENSES_LOADING,
  CLEAR_CURRENT_EXPENSES,
  DELETE_EXPENSE
} from './types';

// Add Expense
export const addExpense = expenseData => dispatch => {
  axios
    .post('/api/expenses', expenseData)
    .then(res =>
      dispatch({
        type: ADD_EXPENSE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete expense
export const deleteExpense = id => dispatch => {
  axios
    .delete(`/api/expenses/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EXPENSE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get current expenses
export const getCurrentExpenses = () => dispatch => {
  dispatch(setExpensesLoading());
  axios
    .get('/api/expenses')
    .then(res =>
      dispatch({
        type: GET_EXPENSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXPENSES,
        payload: []
      })
    );
};

// Expenses loading
export const setExpensesLoading = () => {
  return {
    type: EXPENSES_LOADING
  };
};

// Clear Expenses
export const clearCurrentExpenses = () => {
  return {
    type: CLEAR_CURRENT_EXPENSES
  };
};
