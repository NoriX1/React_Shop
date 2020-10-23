import actionTypes from './types';
import backend from '../apis/backend';

export const setLoadStatus = status => ({
  type: actionTypes.SET_LOAD_STATUS,
  payload: status
});

export const fetchProducts = (sortBy, category) => async (dispatch) => {
  try {
    dispatch(setLoadStatus(false));
    const products = await backend.get(`/products?_sort=${sortBy}${category || category === 0 ? `&category=${category}` : ``}`);
    dispatch({ type: actionTypes.FETCH_PRODUCTS_SUCCESS, payload: products.data });
  } catch ({ request }) {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_ERROR,
      payload: `${request.status}: ${request.statusText}. ${request.error || ''}`
    });
  }
};

export const setSortBy = sortType => {
  return { type: actionTypes.SET_SORT_BY, payload: sortType };
};

export const setCategory = categoryIndex => {
  return { type: actionTypes.SET_CATEGORY, payload: categoryIndex };
};

export const addProductToCart = product => {
  return { type: actionTypes.ADD_PRODUCT_TO_CART, payload: product };
};

export const clearCart = () => {
  return { type: actionTypes.CLEAR_CART }
};

export const removeItemFromCart = (item) => {
  return { type: actionTypes.REMOVE_ITEM_FROM_CART, payload: item };
};

export const addOneItem = (item) => {
  return { type: actionTypes.ADD_ONE_ITEM, payload: item };
};

export const subtractOneItem = (item) => {
  return { type: actionTypes.SUBTRACT_ONE_ITEM, payload: item };
};