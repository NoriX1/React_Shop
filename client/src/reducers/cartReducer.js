import actionTypes from '../actions/types';

const INITIAL_STATE = {
  items: {},
  itemsByProps: {},
  totalPrice: 0,
  totalCount: 0
}

const getKey = action => `${action.payload.id}_${action.payload.type}_${action.payload.size}`;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      const productItem = state.items[action.payload.id];
      const propsItem = state.itemsByProps[getKey(action)];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...action.payload,
            count: productItem && productItem.count ? productItem.count + 1 : 1
          },
        },
        itemsByProps: {
          ...state.itemsByProps,
          [getKey(action)]: {
            count: propsItem && propsItem.count ? propsItem.count + 1 : 1,
            price: propsItem && propsItem.price ? propsItem.price + action.payload.price : action.payload.price
          }
        },
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + action.payload.price
      }
    default:
      return state;
  }
}