import moment from 'moment';
import { Dispatch } from 'redux';

import { User } from '~types/user.type';
import { MessageType } from '~types/message.type';
import { messageService } from '~services/messages.service';
import { MessagesAction } from './types';

export const getMessagesBegin = (): MessagesAction => ({
  type: 'GET_MESSAGES_BEGIN',
});

export const getMessagesSuccess = (messages: MessageType[]): MessagesAction => ({
  type: 'GET_MESSAGES_SUCCESS',
  payload: { messages },
});

export const getMessagesFailure = (error: string): MessagesAction => ({
  type: 'GET_MESSAGES_FAILURE',
  payload: { error },
});

export const getMessages = () => (dispatch: Dispatch) => {
  dispatch(getMessagesBegin());
  messageService
    .getMessages()
    .then((messages) => dispatch(getMessagesSuccess(messages)))
    .catch((err) => dispatch(getMessagesFailure(err)));
};

export const addMessage = (user: User, message: string): MessagesAction => {
  const id = Math.random().toString();

  const newMessage: MessageType = {
    id,
    message,
    ...user,
    created_at: moment().format('YYYY-MM-DD kk:mm:ss'),
    marked_read: false,
  };

  return {
    type: 'ADD_MESSAGE',
    payload: { item: newMessage },
  };
};

export const editMessage = (id: string, message: string): MessagesAction => ({
  type: 'EDIT_MESSAGE',
  payload: { id, message },
});

export const likeMessage = (id: string): MessagesAction => ({
  type: 'LIKE_MESSAGE',
  payload: { id },
});

export const deleteMessage = (id: string): MessagesAction => ({
  type: 'DELETE_MESSAGE',
  payload: { id },
});
