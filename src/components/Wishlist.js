import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist">
        <h2>Wishlist</h2>
        <p className="empty-message">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p className="item-price">${item.price.toFixed(2)}</p>
              <p className="description">{item.description}</p>
            </div>
            <div className="item-actions">
              <button 
                className="btn-add-cart"
                onClick={() => handleMoveToCart(item)}
              >
                Add to Cart
              </button>
              <button 
                className="btn-remove"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
