export interface StockRepo {
  list: (query: StockListQuery) => Promise<StockListApiResponse>;
  search: (query: StockSearchQuery) => Promise<StockListApiResponse>;
  details: (query: StockDetailsQuery) => Promise<StockDetailsApiResponse>;
  dailyStats: (
    query: StockDailyStatsQuery
  ) => Promise<StockDailyStatsApiResponse>;
}

export type StockListQuery = { url?: string; limit?: number; market?: string };

export type StockSearchQuery = {
  search: string;
  url?: string;
  limit?: number;
  market?: string;
};

export type StockDailyStatsQuery = {
  ticker: string;
  date?: Date;
};

export type StockDetailsQuery = {
  ticker: string;
};

export type StockDetailsApiResponse = {
  name: string;
  symbol: string;
  description: string;
  logo: string;
  url: string;
  industry: string;
};

export type StockDailyStatsApiResponse = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
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
  error?: string;
  message?: string;
};
