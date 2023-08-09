import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./Slice";

export const store = configureStore({
  reducer: {
    Order: orderReducer,
  },
});
export default store;
