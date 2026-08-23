import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const MAX_COMPARE = 3;

interface CompareState {
  propertyIds: string[];
}

const initialState: CompareState = {
  propertyIds: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare(state, action: PayloadAction<string>) {
      if (state.propertyIds.includes(action.payload)) return;
      if (state.propertyIds.length >= MAX_COMPARE) return;
      state.propertyIds.push(action.payload);
    },
    removeFromCompare(state, action: PayloadAction<string>) {
      state.propertyIds = state.propertyIds.filter((id) => id !== action.payload);
    },
    clearCompare(state) {
      state.propertyIds = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
