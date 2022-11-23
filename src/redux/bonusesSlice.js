import { createSlice } from "@reduxjs/toolkit";

const bonusesSlice = createSlice({
  name: "bonus",
  initialState: {
    bonuses: [],
  },
  reducers: {
    updateTheBonusses(state, action) {
      state.bonuses = action.payload;
    },
  },
});

export const { updateTheBonusses } = bonusesSlice.actions;
export default bonusesSlice.reducer;
