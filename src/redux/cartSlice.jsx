import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.push(action.payload);
      }
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    deleteAllFromCart(state) {
      return [];
    },

    incrementQuantity: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decrementQuantity: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  deleteAllFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
