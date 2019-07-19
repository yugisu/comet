import { API } from './api.service';

type Credentials = {
  username: string;
  password: string;
};

const login = async (cred: Credentials) => {
  try {
    return await API.sendData('/auth/login', cred);
  } catch (err) {
    throw `Failed to login: ${err}`;
  }
};

const register = async (cred: Credentials) => {
  try {
    return await API.sendData('/auth/register', cred);
  } catch (err) {
    throw `Failed to register: ${err}`;
  }
};

export const authService = {
  login,
  register,
};
