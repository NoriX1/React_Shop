import actionTypes from '../actions/types';
const INITIAL_STATE = {
  sortBy: 'rating',
  category: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    case actionTypes.SET_CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
}