import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsLoading: (state) => {
      state.loading = "loading";
    },

    fetchProductsSuccess: (state, action) => {
      state.loading = "idle";
      state.products = action.payload;
    },

    fetchProductsFailure: (state, action) => {
      state.loading = "failure";
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsLoading,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
