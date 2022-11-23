import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import postsReducer from "./redux/postsSlice";
import profileReducer from "./redux/profilesSlice";
import bonusesReducer from "./redux/bonusesSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postsReducer,
    profile: profileReducer,
    bonuse: bonusesReducer,
  },
});
