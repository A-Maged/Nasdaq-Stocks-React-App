import { AxiosError } from 'axios';

export type searchStocks = (query: Query) => Promise<ApiResponse>;

export type Query = {
  search: string;
  url?: string;
  limit?: number;
  market?: string;
};

export type ApiResponse = {
  results: Stock[];
  next_url: string;
};

export type ApiError = AxiosError<{
  error?: string;
  message?: string;
}>;

export type Stock = {
  ticker: string;
  name: string;
  market: string;
  type: string;
};
