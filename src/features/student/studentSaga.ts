import { call, debounce, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListParams, ListResponse, Student } from "models";
import { studentActions } from "./studentSlice";

function* fetchStudentData(action: PayloadAction<ListParams>) {
  try {
    const {data: studentList, pagination}: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.setListStudent(studentList));
    yield put(studentActions.setPagination(pagination));
    yield put(studentActions.fetchDataSuccess());
    
  } catch(error) {
    yield put(studentActions.fetchDataFailed());
    console.log(error);
  }
};
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga () {
  yield takeLatest(studentActions.fetchData.type, fetchStudentData);

  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
} 