import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, ListParams, PaginationParams } from "models";

export interface CityState {
  loading: boolean;
  list: City[];
  pagination : PaginationParams;
  filter: ListParams;
}

export const initialState: CityState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 15
  }
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCity(state) {
      state.loading = true;
    },
    fetchCitySuccess(state) {
      state.loading = false;
    },
    fetchCityFailed(state) {
      state.loading = false;
    },

    setCity(state, action: PayloadAction<City[]>) {
      state.list = action.payload;
    },
    setPagination(state, action: PayloadAction<PaginationParams>) {
      state.pagination = action.payload;
    },
  }
});

// actions
export const cityActions = citySlice.actions;

// selector

export const selectLoadingCity = (state: RootState) => state.city.loading;
export const selectListCity = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectListCity, (cityList) =>
  cityList.reduce((map:{[key: string]: City}, city) => {
    map[city.code] = city;
    return map;
  }, {})
);
export const selectFilterCity = (state: RootState) => state.city.filter;
export const selectpaginationCity = (state: RootState) => state.city.pagination;

// reducer
const cityReducer = citySlice.reducer;
export default cityReducer;