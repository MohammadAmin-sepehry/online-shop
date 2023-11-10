import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import cartSlice from "./cartSlice";
import userReducer from "./loginSlice";
import orderReducer from "./orderSlice";
import orderReducer2 from "./orderSlice2";
import changeProfileReducer from "./changeProfileSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    cart:cartSlice,
    user:userReducer,
    order:orderReducer,
    order2:orderReducer2,
    changeProfile:changeProfileReducer
  },
});