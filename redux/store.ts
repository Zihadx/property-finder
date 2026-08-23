import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favoritesSlice";
import compareReducer from "./slices/compareSlice";
import filtersReducer from "./slices/filtersSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      compare: compareReducer,
      filters: filtersReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
