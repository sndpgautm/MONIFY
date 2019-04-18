import {
  GET_EXPENSES,
  EXPENSES_LOADING,
  CLEAR_CURRENT_EXPENSES
} from '../actions/types';

const initialState = {
  expense: null,
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
    default:
      return state;
  }
}
