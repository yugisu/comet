import { ChatAction, ChatState } from './types';
import { Reducer } from 'redux';

const initialChatState: ChatState = {
  name: 'Casual chat 🌎',
  userAmount: 11,
  currentUser: { user: 'Dave', avatar: 'https://i.pravatar.cc/300?img=14' },
  editedMessage: null,
};

export const chat: Reducer<ChatState, ChatAction> = (
  state = initialChatState,
  action
) => {
  switch (action.type) {
    case 'TOGGLE_EDITING_MESSAGE':
      return { ...state, editedMessage: action.payload.message };

    default:
      return state;
  }
};
