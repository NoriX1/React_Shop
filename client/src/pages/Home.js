import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, SortPopup, ProductBlock, ProductLoader } from '../components';
import { fetchProducts, setCategory, setSortBy, addProductToCart } from '../actions';
import { categoryItems, sortItems } from '../constants';
import warning from '../assets/img/warning.svg';

const Home = () => {
  const dispatch = useDispatch();

  const { error, products, isLoaded, sortBy, category, productsInCart } = useSelector(({ products, filters, cart }) => ({
    products: products.items,
    error: products.error,
    isLoaded: products.isLoaded,
    sortBy: filters.sortBy,
    category: filters.category,
    productsInCart: cart.items
  }));

  useEffect(() => {
    dispatch(fetchProducts(sortBy, category));
    // eslint-disable-next-line
  }, [category, sortBy]);

  const onChangeCategory = React.useCallback(index => {
    dispatch(setCategory(index));
  }, [dispatch]);

  const onChangeSortType = useCallback(type => {
    dispatch(setSortBy(type));
  }, [dispatch]);

  const onAddProductToCart = useCallback(product => {
    dispatch(addProductToCart(product));
  }, [dispatch]);

  const renderProductList = () => {
    if (error) {
      return (
        <div className="warning">
          <h2 className="warning__header">Упс! Ошибка загрузки данных</h2>
          <div className="warning__message">{error}</div>
          <img className="warning__image" src={warning} alt="warning" />
        </div>
      );
    }
    if (!isLoaded) {
      return (
        <ul className="content__items">
          {Array(8).fill(0).map((item, index) => <ProductLoader key={`${item}_${index}`} />)}
        </ul>
      );
    }
    return (
      <ul className="content__items">
        {products.map(product => (
          <ProductBlock
            {...product}
            key={product.id}
            countInCart={productsInCart[product.id] && productsInCart[product.id].count}
            onAddToCart={onAddProductToCart}
          />)
        )}
      </ul>
    )
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={categoryItems}
          activeCategory={category}
          onChangeCategory={onChangeCategory}
        />
        <SortPopup
          items={sortItems}
          activeSortType={sortBy}
          onChangeSortType={onChangeSortType}
        />
      </div>
      <h2 className="content__title">{category === null ? 'Все пиццы' : categoryItems[category]}</h2>
      {renderProductList()}
    </div>
  );
}

export default Home;
