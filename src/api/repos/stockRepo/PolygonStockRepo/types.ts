export type PolygonStocksApiResponse = {
  results: PolygonStock[];
  status: string;
  request_id: string;
  count: number;
  next_url: string;
};

export type PolygonStocksApiError = {
  status: 'ERROR';
  request_id: string;
  error: string;
};

export type PolygonStock = {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik: string;
  composite_figi: string;
  share_class_figi: string;
  last_updated_utc: string;
};

export type PolygonStockDetailsApiResponse = {
  logo: string;
  listdate: string;
  cik: string;
  bloomberg: string;
  lei: string;
  sic: number;
  country: string;
  industry: string;
  sector: string;
  marketcap: number;
  employees: number;
  phone: string;
  ceo: string;
  url: string;
  description: string;
  exchange: string;
  name: string;
  symbol: string;
  exchangeSymbol: string;
  hq_address: string;
  hq_state: string;
  hq_country: string;
  type: string;
  updated: string;
  tags: string[];
  similar: string[];
  active: boolean;
};

export type PolygonStockDailyStatsApiResponse = {
  status: string;
  from: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  afterHours: number;
  preMarket: number;
};
