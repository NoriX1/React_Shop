import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartFull, CartEmpty } from '../components';
import { clearCart } from '../actions';

const Cart = () => {
  const { totalPrice, totalCount, items, itemsByProps } = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();

  const onClearCart = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) {
      dispatch(clearCart());
    }
  };

  const renderCartWithType = () => {
    if (totalCount) {
      return (
        <CartFull
          items={items}
          itemsByProps={itemsByProps}
          onClearCart={onClearCart}
          totalCount={totalCount}
          totalPrice={totalPrice}
        />
      );
    }
    return <CartEmpty />;
  }

  return (
    <div className="container container-cart">
      {renderCartWithType()}
    </div>
  )
}

export default Cart;
