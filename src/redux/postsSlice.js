import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "post",
  initialState: {
    thePosts: [],
  },
  reducers: {
    updatePosts(state, action) {
      state.thePosts = action.payload;
    },
  },
});

export const { updatePosts } = postsSlice.actions;
export default postsSlice.reducer;
