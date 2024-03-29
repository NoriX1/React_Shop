import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../';
import { availableTypes, avaliableSizes } from '../../constants';

const ProductBlock = React.memo(function ProductBlock({
  id, name, imageUrl, price, types, sizes, onAddToCart, countInCart
}) {
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const onSelectType = id => {
    setActiveType(id);
  }
  const onSelectSize = id => {
    setActiveSize(id);
  }
  const onAddProduct = () => {
    onAddToCart({ id, name, imageUrl, price, type: activeType, size: activeSize });
  }

  return (
    <li className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {Object.values(availableTypes).map(({ id, type }) => (
            <li
              className={`${activeType === id ? 'active' : ''} ${types.includes(id) ? '' : 'disabled'}`}
              onClick={() => onSelectType(id)}
              key={`${id}_${type}`}>
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {Object.values(avaliableSizes).map(({ id, size }) => (
            <li
              className={`${activeSize === id ? 'active' : ''} ${sizes.includes(id) ? '' : 'disabled'}`}
              onClick={() => onSelectSize(id)}
              key={`${id}_${size}`}>
              {`${size} см.`}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <Button className="button__add" onClick={onAddProduct} outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {countInCart && <i>{countInCart}</i>}
        </Button>
      </div>
    </li>
  )
});

ProductBlock.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(PropTypes.number),
  sizes: PropTypes.arrayOf(PropTypes.number),
  onAddToCart: PropTypes.func,
  countInCart: PropTypes.number
};

ProductBlock.defaultProps = {
  types: [],
  sizes: []
};

export default ProductBlock;
