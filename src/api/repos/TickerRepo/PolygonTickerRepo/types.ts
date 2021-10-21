export type PolygonTickersApiResponse = {
  results: PolygonTicker[];
  status: string;
  request_id: string;
  count: number;
  next_url: string;
};

export type PolygonTickersApiError = {
  status: 'ERROR';
  request_id: string;
  error: string;
};

export type PolygonTicker = {
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
