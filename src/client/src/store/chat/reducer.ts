import { ChatState } from './types';
import { Reducer } from 'redux';

const initialChatState: ChatState = {
  name: 'Casual chat 🌎',
};

export const chat: Reducer<ChatState> = (state = initialChatState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
