import actionTypes from '../actions/types';

const INITIAL_STATE = {
  items: {},
  itemsByProps: {},
  totalPrice: 0,
  totalCount: 0
}

const getKey = action => `${action.payload.id}_${action.payload.type}_${action.payload.size}`;
const removeItemFromState = (items, id) => {
  const newItems = { ...items };
  delete newItems[id];
  return newItems;
}

const handleProductsInCart = (state, action, operator, operationCount) => {
  const productItem = state.items[action.payload.id];
  const propsItem = state.itemsByProps[getKey(action)];
  const itemPrice = action.payload.price ? action.payload.price : productItem.price;
  switch (operator) {
    case '+':
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...productItem,
            ...action.payload,
            count: productItem && productItem.count ? productItem.count + operationCount : operationCount
          },
        },
        itemsByProps: {
          ...state.itemsByProps,
          [getKey(action)]: {
            count: propsItem && propsItem.count ? propsItem.count + operationCount : operationCount,
            price: propsItem && propsItem.price ?
              propsItem.price + (itemPrice * operationCount) :
              (itemPrice * operationCount)
          }
        },
        totalCount: state.totalCount + operationCount,
        totalPrice: state.totalPrice + (itemPrice * operationCount)
      }
    case '-':
      const newItems = (productItem.count - operationCount) ? {
        ...state.items,
        [action.payload.id]: {
          ...productItem,
          count: productItem.count - operationCount
        },
      } : {
          ...removeItemFromState(state.items, action.payload.id)
        };
      const newItemsByProps = (propsItem.count - operationCount) ? {
        ...state.itemsByProps,
        [getKey(action)]: {
          ...propsItem,
          count: propsItem.count - operationCount,
          price: propsItem.price - (productItem.price * operationCount)
        }
      } : {
          ...removeItemFromState(state.itemsByProps, getKey(action))
        };
      return {
        ...state,
        items: newItems,
        itemsByProps: newItemsByProps,
        totalCount: state.totalCount - operationCount,
        totalPrice: state.totalPrice - (productItem.price * operationCount)
      }
    default:
      return state;
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      return handleProductsInCart(state, action, '+', 1);

    case actionTypes.REMOVE_ITEM_FROM_CART:
      return handleProductsInCart(state, action, '-', state.itemsByProps[getKey(action)].count);

    case actionTypes.ADD_ONE_ITEM:
      return handleProductsInCart(state, action, '+', 1);

    case actionTypes.SUBTRACT_ONE_ITEM:
      return handleProductsInCart(state, action, '-', 1);

    case actionTypes.CLEAR_CART:
      return INITIAL_STATE;
    default:
      return state;
  }
}