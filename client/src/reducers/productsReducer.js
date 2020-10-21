import actionTypes from '../actions/types';

const INITIAL_STATE = {
  items: [],
  isLoaded: false,
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
        error: ''
      };
    case actionTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.SET_LOAD_STATUS:
      return { ...state, isLoaded: action.payload };
    default:
      return state;
  }
}