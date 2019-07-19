import { MessageType } from '~../../shared/types/message.interface';
import { API } from './api.service';

const getAll = async (): Promise<MessageType[]> => {
  try {
    const messages: MessageType[] = await API.getData('/api/messages');

    if (!Array.isArray(messages)) throw 'Fetched data is not an array of messages';

    return messages;
  } catch (err) {
    throw new Error(`Failed to get messages: ${err}`);
  }
};

const getOneById = async (id: number): Promise<MessageType> => {
  try {
    const message: MessageType = await API.getData(`/api/messages/${id}`);

    return message;
  } catch (err) {
    throw new Error(`Failed to get message #${id}: ${err}`);
  }
};

const send = async (text: string): Promise<MessageType> =>
  await API.sendData('/api/messages', { text });

const deleteMessage = async (id: number) => await API.deleteData(`/api/messages/${id}`);

const patchMessage = async (id: number, text: string): Promise<MessageType> =>
  await API.patchData(`/api/messages/${id}`, { text });

export const messageService = {
  getAll,
  getOneById,
  send,
  deleteMessage,
  patchMessage,
};
