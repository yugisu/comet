import { takeEvery, put, call, all } from 'redux-saga/effects';

import { fetchUsers } from './routines';
import { UserType } from '~../../shared/types/user.interface';
import { usersService } from '~services/users.service';

function* requestUsers() {
  try {
    yield put(fetchUsers.request());

    const users: UserType[] = yield call(usersService.getAll);

    yield put(fetchUsers.success({ users }));
  } catch (err) {
    yield put(fetchUsers.failure(err.message));
  } finally {
    yield put(fetchUsers.fulfill());
  }
}

const watchUsersRequest = function*() {
  yield takeEvery(fetchUsers.TRIGGER, requestUsers);
};

export const usersSagas = function*() {
  yield all([watchUsersRequest()]);
};
