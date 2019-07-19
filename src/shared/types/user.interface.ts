import { MessageType } from './message.interface';

export interface UserType {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
  avatarLink: string;
  messages: MessageType[];
  createdAt: Date;
  updatedAt: Date;
}
