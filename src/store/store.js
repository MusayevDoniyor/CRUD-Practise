import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import usersReducer from "./slices/usersSlice";
import limitedProductsReducer from "./slices/limitedProductsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    limitedProducts: limitedProductsReducer,
  },
});

export default store;
