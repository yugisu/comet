import { MessageT } from './message.interface';

export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
  avatarLink: string;
  messages: MessageT[];
  createdAt: Date;
  updatedAt: Date;
}
