import { httpClient } from 'api';

import { TickerListApiResponse, TickerSearchQuery } from '..';
import { TickerListQuery, TickerRepo } from '../baseTickerRepo';
import { PolygonTickersApiResponse } from './types';

export class PolygonTickerRepo implements TickerRepo {
  getUrl = (nextPageUrl?: string) => {
    return nextPageUrl ?? '/reference/tickers';
  };

  search = ({
    url,
    ...query
  }: TickerSearchQuery): Promise<TickerListApiResponse> => {
    return httpClient
      .get<PolygonTickersApiResponse>(this.getUrl(url), {
        params: {
          market: 'stocks',
          active: true,
          sort: 'ticker',
          order: 'asc',
          limit: 10,
          apiKey: process.env.REACT_APP_API_KEY,
          ...query,
        },
      })
      .then(({ data }) => {
        return {
          results: data.results,
          next_url: data.next_url,
        };
      });
  };

  details = (ticker: string) => new Promise(() => {});

  list = ({
    url,
    ...query
  }: TickerListQuery): Promise<TickerListApiResponse> => {
    return httpClient
      .get<PolygonTickersApiResponse>(this.getUrl(url), {
        params: {
          market: 'stocks',
          active: true,
          sort: 'ticker',
          order: 'asc',
          limit: 10,
          apiKey: process.env.REACT_APP_API_KEY,
          ...query,
        },
      })
      .then(({ data }) => {
        return {
          results: data.results,
          next_url: data.next_url,
        };
      });
  };
}
