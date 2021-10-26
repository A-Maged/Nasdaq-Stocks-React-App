import { AxiosError } from 'axios';

export type dailyStats = (query: Query) => Promise<ApiResponse>;

export type Query = {
  ticker: string;
  date?: Date;
};

export type ApiResponse = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type ApiError = AxiosError<{
  error?: string;
  message?: string;
}>;
