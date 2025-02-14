import { takeEvery, put, call, all } from 'redux-saga/effects';

import { AuthUserTrigger } from './types';
import { API } from '~services/api.service';
import { authService } from '~services/auth.service';

import { authUser } from './routines';

function* loginUser(action: AuthUserTrigger) {
  yield put(authUser.request());

  const token = localStorage.getItem('jwt');

  try {
    let response;

    if (token) {
      response = yield call(API.sendData, '/auth', {});
    } else if (action.payload !== undefined) {
      const { type, ...credentials } = action.payload;
      response = yield call(
        type === 'login' ? authService.login : authService.register,
        credentials
      );
    } else {
      yield put(authUser.failure({}));
    }

    if (response) {
      const { isAuth, ...rest } = response.data;

      if (isAuth) {
        const { token, user } = rest;

        localStorage.setItem('jwt', token);

        yield put(authUser.success({ user }));
      } else {
        throw rest.message;
      }
    }
  } catch (err) {
    console.log(err, token);
    yield put(
      authUser.failure(
        token
          ? {}
          : {
              message:
                action.payload && action.payload.type === 'register'
                  ? 'Failed to register. Maybe entered username is taken?'
                  : 'Failed to login. Check entered data.',
            }
      )
    );
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
