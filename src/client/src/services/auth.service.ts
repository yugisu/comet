import { API } from './api.service';

type Credentials = {
  username: string;
  password: string;
};

export const login = async (cred: Credentials) => {
  try {
    return await API.sendData('/auth/login', cred);
  } catch (err) {
    throw `Failed to login: ${err}`;
  }
};
