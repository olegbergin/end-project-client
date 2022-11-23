import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./redux/userSlice";
import postsReducer from "./redux/postsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});
