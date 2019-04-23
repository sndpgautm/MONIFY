import {
  GET_EXPENSES,
  ADD_EXPENSE,
  EXPENSES_LOADING,
  CLEAR_CURRENT_EXPENSES,
  DELETE_EXPENSE
} from '../actions/types';

const initialState = {
  expense: {},
  expenses: null,
  loading: false
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
    default:
      return state;
  }
}
