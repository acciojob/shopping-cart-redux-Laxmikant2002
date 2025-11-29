
import React from "react";
import './../styles/App.css';
import ProductList from './ProductList';
import Cart from './Cart';
import Wishlist from './Wishlist';

const App = () => {
  return (
    <div className="app">
      <main className="app-main">
        <ProductList />
        <div className="bottom-section">
          <Wishlist />
          <Cart />
        </div>
      </main>
    </div>
  )
}

export default App
