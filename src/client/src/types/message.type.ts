export type MessageType = {
  id: string;
  user: string;
  avatar: string;
  message: string;
  created_at: string;
  marked_read: boolean;
  liked?: boolean;
};
