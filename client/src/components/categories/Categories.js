import React from 'react';
import PropTypes from 'prop-types';

const Categories = React.memo(({ items, onChangeCategory, activeCategory }) => {

  return (
    <div className="categories">
      <ul>
        <li className={activeCategory === null ? 'active' : ''} onClick={() => onChangeCategory(null)}>Все</li>
        {items.map((name, index) => {
          return <li className={activeCategory === index ? 'active' : ''} onClick={() => onChangeCategory(index)} key={`${name}_${index}`}>{name}</li>
        }
        )}
      </ul>
    </div>
  )
});

Categories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onChangeCategory: PropTypes.func,
  activeCategory: PropTypes.number
}

Categories.defaultProps = {
  items: []
}

export default Categories;
