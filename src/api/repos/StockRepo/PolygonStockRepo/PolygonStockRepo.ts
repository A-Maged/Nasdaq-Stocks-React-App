import { httpClient } from 'api';

import { StockListApiResponse, StockSearchQuery } from '..';
import { StockListQuery, StockRepo } from '../baseStockRepo';
import { PolygonStocksApiResponse } from './types';

export class PolygonStockRepo implements StockRepo {
  getUrl = (nextPageUrl?: string) => {
    return nextPageUrl ?? '/reference/tickers';
  };

  search = ({
    url,
    ...query
  }: StockSearchQuery): Promise<StockListApiResponse> => {
    return httpClient
      .get<PolygonStocksApiResponse>(this.getUrl(url), {
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

  list = ({ url, ...query }: StockListQuery): Promise<StockListApiResponse> => {
    return httpClient
      .get<PolygonStocksApiResponse>(this.getUrl(url), {
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

export const polygonStockRepoSingleton = new PolygonStockRepo();
