import { User } from '~types/user.type';
import { MessageType } from '~types/message.type';

export type ChatState = {
  name: string;
  userAmount: number;
  currentUser: User;
  editedMessage: MessageType | null;
};

type ToggleEditingMessage = {
  type: 'TOGGLE_EDITING_MESSAGE';
  payload: {
    message: MessageType | null;
  };
};

export type ChatAction = ToggleEditingMessage;
