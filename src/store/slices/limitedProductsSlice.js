import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limitedProducts: [],
  loading: false,
  error: null,
};

const limitedProductsSlice = createSlice({
  name: "limitedProducts",
  initialState,
  reducers: {
    fetchLimitedProductsLoading: (state) => {
      state.loading = true;
    },

    fetchLimitedProductsSuccess: (state, action) => {
      state.loading = false;
      state.limitedProducts = action.payload;
      state.error = null;
    },

    fetchLimitedProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLimitedProductsLoading,
  fetchLimitedProductsSuccess,
  fetchLimitedProductsFailure,
} = limitedProductsSlice.actions;

export default limitedProductsSlice.reducer;
