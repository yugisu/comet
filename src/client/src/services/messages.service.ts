import { MessageType } from '../types/message.type';

const getMessages = async () => {
  try {
    const response = await fetch('/api/messages');

    if (!response.ok) throw response.statusText;

    const messages: MessageType[] = await response.json();

    if (!Array.isArray(messages)) throw 'Fetched data is not an array of messages';

    return messages;
  } catch (err) {
    throw new Error(`Failed to get messages: ${err}`);
  }
};

export const messageService = {
  getMessages,
};
