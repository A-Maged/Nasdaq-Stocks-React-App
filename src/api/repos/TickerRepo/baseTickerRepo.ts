export interface TickerRepo {
  getUrl: (...args: any) => string;
  list: (query: TickerListQuery) => Promise<TickerListReturn>;
  search: (searchTerm: string) => Promise<unknown>; // @Todo: fix the response type
  details: (ticker: string) => Promise<unknown>; // @Todo: fix the response type
}

export type TickerListQuery = { url?: string; limit?: number; market?: string };

export type TickerListReturn = {
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
