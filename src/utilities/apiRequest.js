import axios from 'axios';
import { ACCOUNTS, WEB_API } from '../constants';

export const authInstance = axios.create({
  baseURL: ACCOUNTS,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

const webAPIInstance = axios.create({
  baseURL: WEB_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApiRequest = async ({
  method = 'GET', url, data = {},
}) => {
  try {
    const response = await authInstance({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiRequest = async ({
  method = 'GET', url, data = {}, headers = {}, params,
}) => {
  try {
    const response = await webAPIInstance({
      method,
      url,
      data,
      headers: {
        ...headers,
        Authorization: `Bearer ${window.sessionStorage.getItem('access_token')}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
