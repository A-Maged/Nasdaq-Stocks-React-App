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
