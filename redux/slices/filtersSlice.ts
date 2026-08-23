import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PropertyFilters, PropertySort } from "@/services/property.service";

interface FiltersState {
  filters: PropertyFilters;
  sort: PropertySort;
  view: "grid" | "list";
}

const initialState: FiltersState = {
  filters: {},
  sort: "newest",
  view: "grid",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<PropertyFilters>) {
      state.filters = action.payload;
    },
    setSort(state, action: PayloadAction<PropertySort>) {
      state.sort = action.payload;
    },
    setView(state, action: PayloadAction<"grid" | "list">) {
      state.view = action.payload;
    },
    resetFilters(state) {
      state.filters = {};
    },
  },
});

export const { setFilters, setSort, setView, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
