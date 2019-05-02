import {
  GET_EXPENSES,
  ADD_EXPENSE,
  EXPENSES_LOADING,
  CLEAR_CURRENT_EXPENSES,
  DELETE_EXPENSE,
  GET_EXPENSE_BY_ID,
  UPDATE_EXPENSE,
  UPDATE_CHART
} from '../actions/types';

const initialState = {
  expense: {},
  expenses: null,
  loading: false,
  expensesByCategory: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EXPENSES_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      };
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false
      };
    case GET_EXPENSE_BY_ID:
      return {
        ...state,
        expense: action.payload
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expense: {},
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id
            ? (expense = action.payload)
            : expense
        )
      };
    case CLEAR_CURRENT_EXPENSES:
      return {
        ...state,
        expenses: null
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          expense => expense._id !== action.payload
        )
      };
    case UPDATE_CHART:
      return {
        ...state,
        expensesByCategory: action.payload
      };
    default:
      return state;
  }
}
