import { takeEvery, put, call, all, takeLeading } from 'redux-saga/effects';

import { MessageType } from '~../../shared/types/message.interface';
import { messageService } from '~services/messages.service';
import { SendMessage, DeleteMessage, PatchMessage } from './types';
import { fetchMessages } from './routines';

function* requestMessages() {
  try {
    yield put(fetchMessages.request());

    const messages: MessageType[] = yield call(messageService.getAll);

    yield put(fetchMessages.success({ messages }));
  } catch (err) {
    yield put(fetchMessages.failure(err.message));
  } finally {
    yield put(fetchMessages.fulfill());
  }
}

const watchMessagesRequest = function*() {
  yield takeEvery(fetchMessages.TRIGGER, requestMessages);
};

function* sendMessage(action: SendMessage) {
  try {
    yield call(messageService.send, action.payload.text);

    yield put(fetchMessages({ soft: true }));
  } catch (err) {
    throw err;
  }
}

function* watchSendMessage() {
  yield takeEvery('SEND_MESSAGE', sendMessage);
}

function* deleteMessage(action: DeleteMessage) {
  try {
    yield call(messageService.deleteMessage, action.payload.id);

    yield put(fetchMessages({ soft: true }));
  } catch (err) {
    throw err;
  }
}

function* watchDeleteMessage() {
  yield takeLeading('DELETE_MESSAGE', deleteMessage);
}

function* patchMessage(action: PatchMessage) {
  try {
    yield call(messageService.patchMessage, action.payload.id, action.payload.text);

    yield put(fetchMessages({ soft: true }));
  } catch (err) {
    throw err;
  }
}

function* watchPatchMessage() {
  yield takeEvery('PATCH_MESSAGE', patchMessage);
}

export const messagesSagas = function*() {
  yield all([
    watchMessagesRequest(),
    watchSendMessage(),
    watchDeleteMessage(),
    watchPatchMessage(),
  ]);
};
