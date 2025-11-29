
import React, { useState } from "react";
import './../styles/App.css';
import ProductList from './ProductList';
import Cart from './Cart';
import Wishlist from './Wishlist';

const App = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Shopping Cart Redux</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={activeTab === 'cart' ? 'active' : ''}
            onClick={() => setActiveTab('cart')}
          >
            Cart
          </button>
          <button 
            className={activeTab === 'wishlist' ? 'active' : ''}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist
          </button>
        </nav>
      </header>
      
      <main className="app-main">
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'cart' && <Cart />}
        {activeTab === 'wishlist' && <Wishlist />}
      </main>
    </div>
  )
}

export default App
