import { LOCAL_STORAGE_KEYS } from '@godiet-config';
import { delay } from '@godiet-utils/delay';

import axios from 'axios';

const { VITE_API_BASE_URL, DEV: IS_DEVELOPMENT } = import.meta.env;

const VITE_API_RESPONSE_SLEEP_MS = Number(
  import.meta.env.VITE_API_RESPONSE_SLEEP_MS
);

export const httpClient = axios.create({
  baseURL: VITE_API_BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const storedAccessToken = localStorage.getItem(
    LOCAL_STORAGE_KEYS.ACCESS_TOKEN
  );

  if (storedAccessToken) {
    config.headers.Authorization = `Bearer ${storedAccessToken}`;
  }

  return config;
});

httpClient.interceptors.request.use((config) => {
  config.headers.set('Access-Control-Allow-Origin', 'https://godiet.com.br');
  config.headers['Content-Type'] = 'application/json';

  return config;
});

httpClient.interceptors.response.use(async (data) => {
  if (IS_DEVELOPMENT && VITE_API_RESPONSE_SLEEP_MS) {
    await delay(VITE_API_RESPONSE_SLEEP_MS);
  }

  return data;
});
