import { delay, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

export default function* counterSaga() {
  console.log('counter Saga');
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('writing 2s');
  
  //write 2s
  yield delay(2000);
  console.log('wrting 2s done');

  yield put(incrementSagaSuccess(action.payload)); 
}