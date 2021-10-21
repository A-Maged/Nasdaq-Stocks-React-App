import { httpClient } from 'api';

import { TickerListReturn } from '..';
import { TickerListQuery, TickerRepo } from '../baseTickerRepo';
import { PolygonTickersApiResponse } from './types';

export class PolygonTickerRepo implements TickerRepo {
  getUrl = (nextUrl?: string) => {
    return nextUrl ?? '/reference/tickers';
  };

  search = (searchTerm: string) => new Promise(() => {});

  details = (ticker: string) => new Promise(() => {});

  list = ({ url, ...query }: TickerListQuery): Promise<TickerListReturn> => {
    return httpClient
      .get<PolygonTickersApiResponse>(this.getUrl(url), {
        params: {
          market: 'stocks',
          active: true,
          sort: 'ticker',
          order: 'asc',
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
