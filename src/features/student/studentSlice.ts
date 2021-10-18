import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListParams, PaginationParams, Student } from "models";

export interface StudentState {
  loading? : boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
};

export const initialState: StudentState = {
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
}

const studentSlice = createSlice({
  name: 'student',
  initialState: initialState,
  reducers: {
    fetchData(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setFilter(state, action) {
      state.filter =  action.payload;
    },
    setListStudent(state, action: PayloadAction<Student[]>) {
      state.list = action.payload;
    },
    setPagination(state, action:PayloadAction<PaginationParams>) {
      state.pagination = action.payload;
    },
    setFilterWithDebounce(state, action:PayloadAction<ListParams>) {},

  },
});

// Action
export const studentActions = studentSlice.actions;
// Selector
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

// reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;