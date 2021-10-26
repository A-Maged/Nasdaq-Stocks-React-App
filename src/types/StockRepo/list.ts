import { AxiosError } from 'axios';

export type listStocks = (query?: Query) => Promise<ApiResponse>;

export type Query = {
  url?: string | null;
  limit?: number | null;
  market?: string | null;
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
