import { takeEvery, put, call, all } from 'redux-saga/effects';

import { fetchMessages } from './routines';
import { MessageType } from '~../../shared/types/message.interface';
import { SendMessage } from './types';
import { messageService } from '~services/messages.service';

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

export const messagesSagas = function*() {
  yield all([watchMessagesRequest(), watchSendMessage()]);
};
