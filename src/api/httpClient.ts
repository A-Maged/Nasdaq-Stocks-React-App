import axios from 'axios';

import { apiBaseUrlV1, apiBaseUrlV3 } from 'config';

export const httpClientV3 = axios.create({
  baseURL: apiBaseUrlV3,
  params: {
    apiKey: process.env.REACT_APP_API_KEY,
  },
});

export const httpClientV1 = axios.create({
  baseURL: apiBaseUrlV1,
  params: {
    apiKey: process.env.REACT_APP_API_KEY,
  },
});
