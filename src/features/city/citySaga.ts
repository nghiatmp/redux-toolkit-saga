import { call, put, takeLatest } from "@redux-saga/core/effects"
import cityApi from "api/cityApi";
import { City, ListResponse } from "models";
import { cityActions } from "./citySlice"

function* fetchCity() {  
  try {
    const {data: cityList, pagination } : ListResponse<City> = yield call(cityApi.getAll);
    
    yield put(cityActions.setCity(cityList));
    yield put(cityActions.setPagination(pagination));
    yield put(cityActions.fetchCitySuccess());
    
  } catch (error) {
    put(cityActions.fetchCityFailed());
    console.log(error);
  }
}

export function* citySaga() {
  yield takeLatest(cityActions.fetchCity.type, fetchCity);
}