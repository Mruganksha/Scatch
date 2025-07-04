import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of product objects
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
  const item = action.payload;

  // Add a uniqueKey if variants exist (like size, color, etc.)
  const existing = state.items.find(
    p => p.id === item.id &&
         p.size === item.size &&
         p.name === item.name
  );

  if (!existing) {
    state.items.push({ ...item, quantity: 1 });
  } else {
    existing.quantity += 1;
  }
},
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItemsFromCart: (state, action) => {
  const itemIdsToRemove = action.payload;
  state.items = state.items.filter(item => !itemIdsToRemove.includes(item.id));
},

  },
});


export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeItemsFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
