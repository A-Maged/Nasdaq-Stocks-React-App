import { AxiosError } from 'axios';

export type stockDetails = (query: Query) => Promise<ApiResponse>;

export type Query = { ticker: string };

export type ApiResponse = {
  name: string;
  symbol: string;
  description: string;
  logo: string;
  url: string;
  industry: string;
};

export type ApiError = AxiosError<{
  error?: string;
  message?: string;
}>;
