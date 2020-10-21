import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Categories, SortPopup, ProductBlock, ProductLoader } from '../components';
import { fetchProducts, setCategory, setSortBy } from '../actions';

const categoryItems = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const sortItems = [
  { type: 'rating', name: "популярности" },
  { type: 'price', name: "цене" },
  { type: 'name', name: "алфавиту" }
]

const Home = ({ products, setCategory, isLoaded, sortBy, category, setSortBy }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(sortBy, category));
    // eslint-disable-next-line
  }, [category, sortBy])

  const onChangeCategory = index => {
    setCategory(index);
  };

  const onChangeSortType = type => {
    setSortBy(type);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={categoryItems}
          activeCategory={category}
          onChangeCategory={(index) => onChangeCategory(index)}
        />
        <SortPopup
          items={sortItems}
          activeSortType={sortBy}
          onChangeSortType={(type) => onChangeSortType(type)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <ul className="content__items">
        {isLoaded ?
          products.map(product => <ProductBlock key={product.id} {...product} />) :
          Array(8).fill(0).map((item, index) => <ProductLoader key={`${item}_${index}`} />)}
      </ul>
    </div>
  );
}

function mapStateToProps({ products, filters }) {
  return {
    products: products.items,
    isLoaded: products.isLoaded,
    sortBy: filters.sortBy,
    category: filters.category
  };
}

export default connect(mapStateToProps, { setCategory, setSortBy })(Home);
