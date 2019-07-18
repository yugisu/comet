import { MessageType } from '~types/message.type';

export type MessagesState = {
  items: MessageType[];
  loading: boolean;
  error: string | null;
};

type GetMessagesBegin = {
  type: 'GET_MESSAGES_BEGIN';
};

type GetMessagesSuccess = {
  type: 'GET_MESSAGES_SUCCESS';
  payload: {
    messages: MessageType[];
  };
};

type GetMessagesFailure = {
  type: 'GET_MESSAGES_FAILURE';
  payload: {
    error: string;
  };
};

type AddMessage = {
  type: 'ADD_MESSAGE';
  payload: {
    item: MessageType;
  };
};

type EditMessage = {
  type: 'EDIT_MESSAGE';
  payload: {
    id: string;
    message: string;
  };
};

type LikeMessage = {
  type: 'LIKE_MESSAGE';
  payload: {
    id: string;
  };
};

type DeleteMessage = {
  type: 'DELETE_MESSAGE';
  payload: {
    id: string;
  };
};

export type MessagesAction =
  | GetMessagesBegin
  | GetMessagesSuccess
  | GetMessagesFailure
  | AddMessage
  | EditMessage
  | LikeMessage
  | DeleteMessage;
