import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, SortPopup, ProductBlock, ProductLoader } from '../components';
import { fetchProducts, setCategory, setSortBy, addProductToCart } from '../actions';
import { categoryItems, sortItems } from '../constants';

const Home = () => {
  const dispatch = useDispatch();

  const { products, isLoaded, sortBy, category, productsInCart } = useSelector(({ products, filters, cart }) => ({
    products: products.items,
    isLoaded: products.isLoaded,
    sortBy: filters.sortBy,
    category: filters.category,
    productsInCart: cart.items
  }));

  useEffect(() => {
    dispatch(fetchProducts(sortBy, category));
    // eslint-disable-next-line
  }, [category, sortBy]);

  const onChangeCategory = index => {
    dispatch(setCategory(index));
  };

  const onChangeSortType = type => {
    dispatch(setSortBy(type));
  };

  const onAddProductToCart = product => {
    dispatch(addProductToCart(product));
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
      <h2 className="content__title">{category === null ? 'Все пиццы' : categoryItems[category]}</h2>
      <ul className="content__items">
        {isLoaded ?
          products.map(product => <ProductBlock
            {...product}
            key={product.id}
            countInCart={productsInCart[product.id] && productsInCart[product.id].count}
            onAddToCart={(product) => onAddProductToCart(product)} />) :
          Array(8).fill(0).map((item, index) => <ProductLoader key={`${item}_${index}`} />)}
      </ul>
    </div>
  );
}

export default Home;
