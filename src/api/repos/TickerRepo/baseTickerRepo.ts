export interface TickerRepo {
  getUrl: (...args: any) => string;
  list: (query: TickerListQuery) => Promise<TickerListApiResponse>;
  search: (query: TickerSearchQuery) => Promise<TickerListApiResponse>;
  details: (ticker: string) => Promise<unknown>; // @Todo: fix the response type
}

export type TickerListQuery = { url?: string; limit?: number; market?: string };

export type TickerSearchQuery = {
  search: string;
  url?: string;
  limit?: number;
  market?: string;
};

export type TickerListApiResponse = {
  results: Ticker[];
  next_url: string;
};

export type Ticker = {
  ticker: string;
  name: string;
  market: string;
  type: string;
};

export type TickerApiError = {
  error: string;
};
