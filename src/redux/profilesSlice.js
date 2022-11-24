import { createSlice } from "@reduxjs/toolkit";

const profilesSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [],
  },
  reducers: {
    updateProfiles(state, action) {
      state.profiles = action.payload;
    },
  },
});

export const { updateProfiles } = profilesSlice.actions;
export default profilesSlice.reducer;
