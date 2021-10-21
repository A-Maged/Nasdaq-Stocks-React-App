import axios from 'axios';

import { apiBaseURL } from 'config';

export const httpClient = axios.create({
  baseURL: apiBaseURL,
});
