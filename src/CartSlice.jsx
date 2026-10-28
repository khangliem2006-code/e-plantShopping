
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const identifier = action.payload;

      state.items = state.items.filter(
        (item) =>
          item.id !== identifier && item.name !== identifier
      );
    },

    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;

      const item = state.items.find(
        (item) =>
          (id !== undefined && item.id === id) ||
          (name !== undefined && item.name === name)
      );

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          (currentItem) => currentItem !== item
        );
      } else {
        item.quantity = quantity;
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity -= 1;
      }

      state.items = state.items.filter(
        (item) => item.quantity > 0
      );
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
