import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  propertyIds: string[];
}

const initialState: FavoritesState = {
  propertyIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.propertyIds = state.propertyIds.includes(id)
        ? state.propertyIds.filter((existing) => existing !== id)
        : [...state.propertyIds, id];
    },
    clearFavorites(state) {
      state.propertyIds = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
