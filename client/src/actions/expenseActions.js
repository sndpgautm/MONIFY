import axios from 'axios';

import {
  GET_EXPENSES,
  ADD_EXPENSE,
  GET_ERRORS,
  EXPENSES_LOADING,
  CLEAR_CURRENT_EXPENSES,
  DELETE_EXPENSE,
  GET_EXPENSE_BY_ID,
  UPDATE_EXPENSE,
  CLEAR_ERRORS
} from './types';

// Add Expense
export const addExpense = (expenseData, history) => dispatch => {
  axios
    .post('/api/expenses', expenseData)
    .then(res =>
      dispatch({
        type: ADD_EXPENSE,
        payload: res.data
      })
    )
    .then(res => dispatch({ type: CLEAR_ERRORS }))
    .then(res => history.push('/expenses'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Expense
export const updateExpense = (expenseData, id, history) => dispatch => {
  axios
    .post(`/api/expenses/${id}`, expenseData)
    .then(res =>
      dispatch({
        type: UPDATE_EXPENSE,
        payload: res.data
      })
    )
    .then(res => dispatch({ type: CLEAR_ERRORS }))
    .then(res => history.push('/expenses'))
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

// Get current expenses of current user
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

// Get current expense data by id
export const getCurrentExpenseById = id => dispatch => {
  axios
    .get(`/api/expenses/${id}`)
    .then(res =>
      dispatch({
        type: GET_EXPENSE_BY_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXPENSE_BY_ID,
        payload: {}
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
