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
  CLEAR_ERRORS,
  UPDATE_CHART
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
    .then(res => history.push('/dashboard'))
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
    .then(res => history.push('/dashboard'))
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
  // Call update chart after few sec to reload chart data if delete action is successful
  setTimeout(() => {
    dispatch(reqForChartData());
  }, 100);
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

export const reqForChartData = () => dispatch => {
  axios
    .get('/api/expenses')
    .then(res =>
      dispatch({
        type: UPDATE_CHART,
        payload: calculateChartData(res.data)
      })
    )
    .catch(err => console.log(err));
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

// Calculate  array of expenses by categories for chart data
export const calculateChartData = expenses => {
  const Food = sumByCategories(expenses, 'Food & Drinks');
  const Shopping = sumByCategories(expenses, 'Shopping');
  const Housing = sumByCategories(expenses, 'Housing');
  const Transportation = sumByCategories(expenses, 'Transportation');
  const Leisure = sumByCategories(expenses, 'Leisure');
  const Others = sumByCategories(expenses, 'Others');
  return [Food, Shopping, Housing, Transportation, Leisure, Others];
};

// Calculate total sum of expenses by category
export const sumByCategories = (expenses, category) => {
  if (expenses) {
    let sum = 0;
    const filteredExpenses = expenses.filter(
      expense => expense.category === category
    );
    filteredExpenses.forEach(expense => {
      sum = sum + Number(expense.amount);
    });
    return sum;
  }
};
