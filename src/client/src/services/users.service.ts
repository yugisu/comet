import { UserType } from '~../../shared/types/user.interface';
import { API } from './api.service';

const getAll = async (): Promise<UserType[]> => {
  try {
    const users: UserType[] = await API.getData('/api/users');

    if (!Array.isArray(users)) throw 'Fetched data is not an array';

    return users;
  } catch (err) {
    throw new Error(`Failed to get users: ${err}`);
  }
};

const getOneById = async (id: number): Promise<UserType> => {
  try {
    const user: UserType = await API.getData(`/api/users/${id}`);

    return user;
  } catch (err) {
    throw new Error(`Failed to get message #${id}: ${err}`);
  }
};

export const usersService = {
  getAll,
  getOneById,
};
