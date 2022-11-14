import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./redux/tokenSlice";
import userReducer from "./redux/userSlice";

export default configureStore({
  reducer: {
    role: userReducer,
    token: tokenReducer,  },
});
