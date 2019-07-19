import { all } from 'redux-saga/effects';
import { messagesSagas } from './messages/sagas';
import { userAuthSagas } from './user/sagas';
import { usersSagas } from './users/sagas';

export const rootSaga = function*() {
  yield all([userAuthSagas(), messagesSagas(), usersSagas()]);
};
