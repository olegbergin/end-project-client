import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {
    updatePosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { updatePosts } = postsSlice.actions;
export default postsSlice.reducer;
