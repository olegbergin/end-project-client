import { configureStore } from "@reduxjs/toolkit";
import { exampleSlice } from "./redux/newSlice";

export default configureStore({
  reducer: {
    example: exampleSlice,
  },
});
