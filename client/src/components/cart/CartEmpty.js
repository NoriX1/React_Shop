import React from 'react';
import { Link } from 'react-router-dom';

import emptyCartImage from './empty-cart.png';

const CartEmpty = () => {
  return (
    <div className="cart cart_empty">
      <h2>Корзина пустая <span role="img" aria-label=":(">😕</span></h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emptyCartImage} alt="Empty cart" />
      <Link to="/" className="button button_black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}

export default CartEmpty;
