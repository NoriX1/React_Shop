import { combineReducers } from 'redux';

import products from './productsReducer';
import filters from './filtersReducer';
import cart from './cartReducer';

export default combineReducers({
  products,
  filters,
  cart
});