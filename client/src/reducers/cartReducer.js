import actionTypes from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  items: {},
  itemsByProps: {},
  totalPrice: 0,
  totalCount: 0
}

const getKey = action => `${action.payload.id}_${action.payload.type}_${action.payload.size}`;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART: {
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
    }

    case actionTypes.REMOVE_ITEM_FROM_CART: {
      const productItem = state.items[action.payload.id];
      const propsItem = state.itemsByProps[getKey(action)];
      const newItems = (productItem.count - propsItem.count) ? {
        ...state.items,
        [action.payload.id]: {
          ...productItem,
          count: productItem.count - propsItem.count
        },
      } : {
          ..._.omit(state.items, action.payload.id)
        }
      return {
        ...state,
        items: newItems,
        itemsByProps: {
          ..._.omit(state.itemsByProps, getKey(action))
        },
        totalCount: state.totalCount - propsItem.count,
        totalPrice: state.totalPrice - (productItem.price * propsItem.count),
      };
    }

    case actionTypes.ADD_ONE_ITEM: {
      const productItem = state.items[action.payload.id];
      const propsItem = state.itemsByProps[getKey(action)];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...productItem,
            count: productItem.count + 1
          },
        },
        itemsByProps: {
          ...state.itemsByProps,
          [getKey(action)]: {
            ...propsItem,
            count: propsItem.count + 1,
            price: propsItem.price + productItem.price
          }
        },
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + productItem.price
      };
    }

    case actionTypes.SUBTRACT_ONE_ITEM: {
      const productItem = state.items[action.payload.id];
      const propsItem = state.itemsByProps[getKey(action)];
      const newItems = (productItem.count - 1) ? {
        ...state.items,
        [action.payload.id]: {
          ...productItem,
          count: productItem.count - 1
        },
      } : {
          ..._.omit(state.items, action.payload.id)
        };
      const newItemsByProps = (propsItem.count - 1) ? {
        ...state.itemsByProps,
        [getKey(action)]: {
          ...propsItem,
          count: propsItem.count - 1,
          price: propsItem.price - productItem.price
        }
      } : {
          ..._.omit(state.itemsByProps, getKey(action))
        };
      return {
        ...state,
        items: newItems,
        itemsByProps: newItemsByProps,
        totalCount: state.totalCount - 1,
        totalPrice: state.totalPrice - productItem.price
      }
    }

    case actionTypes.CLEAR_CART:
      return INITIAL_STATE;
    default:
      return state;
  }
}