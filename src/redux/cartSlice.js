import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  coupon: null,
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    applyCoupon: (state, action) => {
      const couponCode = action.payload.toUpperCase();
      // Define available coupons
      const coupons = {
        'SAVE10': 10,
        'SAVE20': 20,
        'SAVE30': 30,
      };
      
      if (coupons[couponCode]) {
        state.coupon = couponCode;
        state.discount = coupons[couponCode];
      } else {
        state.coupon = null;
        state.discount = 0;
      }
    },
    removeCoupon: (state) => {
      state.coupon = null;
      state.discount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
