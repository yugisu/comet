import { createRoutine } from 'redux-saga-routines';
import { MessageType } from '~../../shared/types/message.interface';

export const fetchMessages = createRoutine<{ messages: MessageType[] }>('GET_MESSAGES');
