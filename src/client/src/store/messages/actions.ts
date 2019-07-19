import { MessageType } from '~../../shared/types/message.interface';
import { MessagesAction, SendMessage } from './types';

export const sendMessage = (text: string): SendMessage => ({
  type: 'SEND_MESSAGE',
  payload: {text}
})

export const addMessage = (message: MessageType): MessagesAction => {
  return {
    type: 'ADD_MESSAGE',
    payload: { item: message },
  };
};

export const editMessage = (id: number, message: string): MessagesAction => ({
  type: 'EDIT_MESSAGE',
  payload: { id, message },
});

export const likeMessage = (id: number): MessagesAction => ({
  type: 'LIKE_MESSAGE',
  payload: { id },
});

export const deleteMessage = (id: number): MessagesAction => ({
  type: 'DELETE_MESSAGE',
  payload: { id },
});
