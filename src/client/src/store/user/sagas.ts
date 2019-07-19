import { takeEvery, put, call, all } from 'redux-saga/effects';

import { AuthUserTrigger } from './types';
import { API } from '~services/api.service';
import { login } from '~services/auth.service';

import { authUser } from './routines';

function* loginUser(action: AuthUserTrigger) {
  yield put(authUser.request());

  const token = localStorage.getItem('jwt');

  try {
    let response;

    if (token) {
      response = yield call(API.sendData, '/auth', {});
    } else if (action.payload !== undefined) {
      response = yield call(login, action.payload);
      console.log(action.payload, 'res:', response);
    } else {
      yield put(authUser.failure({ message: 'Login failed' }));
    }

    const { isAuth, ...rest } = response.data;

    if (isAuth) {
      const { token, user } = rest;

      localStorage.setItem('jwt', token);

      yield put(authUser.success({ user }));
    } else {
      throw rest.message;
    }
  } catch (err) {
    yield put(authUser.failure(token ? {} : { message: err }));
    localStorage.removeItem('jwt');
  } finally {
    yield put(authUser.fulfill());
  }
}

function* watchLoginUser() {
  yield takeEvery(authUser.TRIGGER, loginUser);
}

export function* userAuthSagas() {
  yield all([watchLoginUser()]);
}
