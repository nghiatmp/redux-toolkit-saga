import { put, take, fork, call, delay } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import { authActions, LoginPayload } from "./authSlice";
import {push} from 'connected-react-router';
import { stringify } from "querystring";

function* handleLogin(payload: LoginPayload): any {
  try {
    const currentUser = yield authApi.login();
    localStorage.setItem('access_token', stringify(currentUser));
    console.log(currentUser);
    yield put(authActions.loginSuccess(currentUser));
    
    yield put(push('/admin/dashboard'));
    
  } catch (error) {
    yield put(authActions.loginError('login fail'));
  }
 
}

function* handleLogout() {
  console.log('vao day');
  
  yield delay(100);
  localStorage.removeItem('access_token');

  yield put(push('/login'));
};
function* watchLoginFlow() {

  while(true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action :PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
  
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
  
};

export function* authSaga() {
  yield fork(watchLoginFlow);
};
