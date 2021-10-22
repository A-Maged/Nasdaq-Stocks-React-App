export interface StockRepo {
  getUrl: (...args: any) => string;
  list: (query: StockListQuery) => Promise<StockListApiResponse>;
  search: (query: StockSearchQuery) => Promise<StockListApiResponse>;
  details: (ticker: string) => Promise<unknown>; // @Todo: fix the response type
}

export type StockListQuery = { url?: string; limit?: number; market?: string };

export type StockSearchQuery = {
  search: string;
  url?: string;
  limit?: number;
  market?: string;
};

export type StockListApiResponse = {
  results: Stock[];
  next_url: string;
};

export type Stock = {
  ticker: string;
  name: string;
  market: string;
  type: string;
};

export type StockApiError = {
  error: string;
};
