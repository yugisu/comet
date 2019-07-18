import { ChatAction } from './types';
import { MessageType } from '~types/message.type';

export const toggleEditingMessage = (message: MessageType | null = null): ChatAction => ({
  type: 'TOGGLE_EDITING_MESSAGE',
  payload: {
    message,
  },
});
