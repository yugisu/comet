import { UsersAction } from './types';
import { UserType } from '~../../shared/types/user.interface';

export const editUser = (id: number, user: UserType): UsersAction => ({
  type: 'EDIT_USER',
  payload: { id, user },
});

export const deleteUser = (id: number): UsersAction => ({
  type: 'DELETE_USER',
  payload: { id },
});
