import React from 'react';
import { Route } from 'react-router-dom';

import { Header } from './components';
import { Cart, Home, Payment } from './pages';


function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/payment" component={Payment} />
      </div>
    </div>
  );
}

export default App;
