import axios from 'axios';

import {
  GET_EXPENSES,
  EXPENSES_LOADING,
  CLEAR_CURRENT_EXPENSES
} from './types';

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
