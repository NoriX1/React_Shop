import actionTypes from '../actions/types';

const INITIAL_STATE = {
  items: {},
  totalPrice: 0,
  totalCount: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      const newItems = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id] ?
          [action.payload] :
          [...state.items[action.payload.id], action.payload]
      };
      const allProducts = [].concat(...Object.values(newItems));
      return {
        ...state,
        items: newItems,
        totalCount: allProducts.length,
        totalPrice: allProducts.reduce((sum, item) => sum + item.price, 0)
      };
    default:
      return state;
  }
}