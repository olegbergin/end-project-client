import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    fullname: "",
    token: "",
    role: "",
    email: "",
  },
  reducers: {
    updateName(state, action) {
      state.fullname = action.payload;
    },
    updateEmail(state, action) {
      state.email = action.payload;
    },
    updateToken(state, action) {
      state.token = action.payload;
    },
    updateRole(state, action) {
      state.role = action.payload;
    },
    logOut(state) {
      state.role = "";
      state.fullname = "";
      state.token = "";
      localStorage.setItem("myToken", "");
    },
  },
});

export const { updateEmail, updateName, updateToken, updateRole, logOut } =
  userSlice.actions;
export default userSlice.reducer;
