import axios, { AxiosRequestConfig } from 'axios';

import { getJWT } from '~helpers/get-jwt.helper';

const API_ROOT = '';

const getData = async (
  endpoint: string,
  settings: AxiosRequestConfig = {}
): Promise<any> => {
  const url = API_ROOT + endpoint;

  const token = getJWT();
  if (token) {
    settings.headers = { ...settings.headers, auth: token };
  }

  const response = await axios.get(url, settings);

  if (!/2[0-9]{2}/.test(response.status.toString())) {
    throw new Error(`Fetching '${url}' failed, received ${response.status}`);
  }

  return await response.data;
};

const sendData = (
  endpoint: string,
  data: object,
  settings: AxiosRequestConfig = {}
): Promise<any> => {
  const url = API_ROOT + endpoint;

  const token = getJWT();
  if (token) {
    settings.headers = { ...settings.headers, auth: token };
  }

  return axios.post(url, data, settings);
};

export const API = {
  getData,
  sendData,
};
