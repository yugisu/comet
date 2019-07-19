import { MessageType } from '~../../shared/types/message.interface';

export type MessagesState = {
  items: MessageType[];
  loading: boolean;
  error: string | null;
};

type GetMessagesTrigger = {
  type: 'GET_MESSAGES/TRIGGER';
  payload?: { soft: boolean };
};

type GetMessagesRequest = {
  type: 'GET_MESSAGES/REQUEST';
};

type GetMessagesSuccess = {
  type: 'GET_MESSAGES/SUCCESS';
  payload: {
    messages: MessageType[];
  };
};

type GetMessagesFailure = {
  type: 'GET_MESSAGES/FAILURE';
  payload: {
    error: string;
  };
};

type GetMessagesFullfill = {
  type: 'GET_MESSAGES/FULLFILL';
};

export type SendMessage = {
  type: 'SEND_MESSAGE';
  payload: {
    text: string;
  };
};

type AddMessage = {
  type: 'ADD_MESSAGE';
  payload: {
    item: MessageType;
  };
};

export type PatchMessage = {
  type: 'PATCH_MESSAGE';
  payload: {
    message: MessageType;
  };
};

type EditMessage = {
  type: 'EDIT_MESSAGE';
  payload: {
    id: number;
    message: string;
  };
};

type LikeMessage = {
  type: 'LIKE_MESSAGE';
  payload: {
    id: number;
  };
};

type DeleteMessage = {
  type: 'DELETE_MESSAGE';
  payload: {
    id: number;
  };
};

export type MessagesAction =
  | GetMessagesTrigger
  | GetMessagesRequest
  | GetMessagesSuccess
  | GetMessagesFailure
  | GetMessagesFullfill
  | AddMessage
  | EditMessage
  | LikeMessage
  | DeleteMessage;
