import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  applyCoupon,
  removeCoupon,
} from '../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, coupon, discount } = useSelector((state) => state.cart);
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      dispatch(applyCoupon(couponInput));
      const validCoupons = ['SAVE10', 'SAVE20', 'SAVE30'];
      if (validCoupons.includes(couponInput.toUpperCase())) {
        setCouponMessage('Coupon applied successfully!');
      } else {
        setCouponMessage('Invalid coupon code');
      }
      setCouponInput('');
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponMessage('');
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    return (calculateSubtotal() * discount) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>Shopping Cart</h2>
        <div className="cart-header">
          <p>Cart ( 0 items)</p>
        </div>
        <p className="empty-message">Your cart is empty</p>
        <div className="cart-summary">
          <h3>The Total Amount Of</h3>
          <div className="summary-row">
            <span>Temporary Amount</span>
            <span>Rs 0</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount Of<br/>(including VAT)</span>
            <span>Rs 0</span>
          </div>
          <button className="btn-checkout">Go to checkout</button>
          <div className="coupon-link">
            <span>Add a discount code (optional)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-header">
        <p>Cart ( {items.length} items)</p>
      </div>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p className="item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => handleDecrease(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item.id)}>+</button>
            </div>
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button 
              className="btn-remove"
              onClick={() => handleRemove(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="coupon-section">
        <h3>Apply Coupon</h3>
        <div className="coupon-input-group">
          <input
            type="text"
            placeholder="Enter coupon code (SAVE10, SAVE20, SAVE30)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            disabled={!!coupon}
          />
          {!coupon ? (
            <button onClick={handleApplyCoupon}>Apply</button>
          ) : (
            <button onClick={handleRemoveCoupon} className="btn-remove-coupon">
              Remove
            </button>
          )}
        </div>
        {couponMessage && (
          <p className={`coupon-message ${coupon ? 'success' : 'error'}`}>
            {couponMessage}
          </p>
        )}
        {coupon && (
          <p className="applied-coupon">Applied: {coupon} ({discount}% off)</p>
        )}
      </div>

      <div className="cart-summary">
        <h3>The Total Amount Of</h3>
        <div className="summary-row">
          <span>Temporary Amount</span>
          <span>Rs {calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        {discount > 0 && (
          <div className="summary-row discount">
            <span>Discount ({discount}%)</span>
            <span>-Rs {calculateDiscount().toFixed(2)}</span>
          </div>
        )}
        <div className="summary-row total">
          <span>Total Amount Of<br/>(including VAT)</span>
          <span>Rs {calculateTotal().toFixed(2)}</span>
        </div>
        <button className="btn-checkout">Go to checkout</button>
        <div className="coupon-link">
          <span>Add a discount code (optional)</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
