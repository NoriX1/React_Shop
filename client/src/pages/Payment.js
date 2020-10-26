import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import order from '../assets/img/order.svg';

const Payment = () => {
  const history = useHistory();
  const { totalCount } = useSelector(({ cart }) => ({ totalCount: cart.totalCount }));

  useEffect(() => {
    if (!totalCount) {
      history.push('/');
    }// eslint-disable-next-line
  }, [])

  return (
    <div className="container">
      <div className="payment">
        <h2 className="payment__header">Заказ составлен!</h2>
        <div className="payment__desc">Оплата не реализована, детали заказа в панели разработчика :)</div>
        <img className="payment__image" src={order} alt="order-success" />
      </div>
    </div>
  )
}

export default Payment;
