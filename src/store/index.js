import { configureStore } from "@reduxjs/toolkit";
import { actionApi } from "../components/basket/basketApi";

import goods from "../components/slices/goodsSlice";

const store = configureStore({
  reducer: { goods, [actionApi.reducerPath]: actionApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
