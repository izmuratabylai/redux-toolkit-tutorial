import { createSlice } from "@reduxjs/toolkit";

import {createAsyncThunk} from '@reduxjs/toolkit'

const url = "https://course-api.com/react-useReducer-cart-project"

const initialState = {
  cartItems: [],
  isLoading: true,
  amount: 0,
  total: 0,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url)
        .then((res) => res.json())
        .catch((error) =>console.log(error))
})


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId;
      });
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
      [getCartItems.fulfilled]: (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

//console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
