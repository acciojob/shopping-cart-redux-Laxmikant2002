import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import products from '../data/products';

const ProductList = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = (product) => {
    const isInWishlist = wishlistItems.find(item => item.id === product.id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <div className="button-group">
              <button 
                className="btn-add-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button 
                className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => handleToggleWishlist(product)}
              >
                {isInWishlist(product.id) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
