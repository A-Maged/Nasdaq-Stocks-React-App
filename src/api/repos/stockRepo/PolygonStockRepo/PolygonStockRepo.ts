import { format, subDays } from 'date-fns';

import { httpClientV1, httpClientV3 } from 'api';

import {
  StockListQuery,
  StockDetailsQuery,
  StockSearchQuery,
  StockRepo,
  StockDailyStatsQuery,
} from '../baseStockRepo';
import {
  PolygonStockDailyStatsApiResponse,
  PolygonStockDetailsApiResponse,
  PolygonStocksApiResponse,
} from './types';

export class PolygonStockRepo implements StockRepo {
  search = ({ url: nextPageUrl, ...query }: StockSearchQuery) => {
    const url = nextPageUrl ?? '/reference/tickers';

    return httpClientV3
      .get<PolygonStocksApiResponse>(url, {
        params: {
          market: 'stocks',
          active: true,
          sort: 'ticker',
          order: 'asc',
          limit: 10,
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

  details = ({ ticker }: StockDetailsQuery) => {
    return httpClientV1
      .get<PolygonStockDetailsApiResponse>(`/meta/symbols/${ticker}/company`)
      .then(({ data }) => ({
        name: data.name,
        symbol: data.symbol,
        description: data.description,
        logo: data.logo,
        url: data.url,
        industry: data.industry,
      }));
  };

  list = ({ url: nextPageUrl, ...query }: StockListQuery) => {
    const url = nextPageUrl ?? '/reference/tickers';

    return httpClientV3
      .get<PolygonStocksApiResponse>(url, {
        params: {
          market: 'stocks',
          active: true,
          sort: 'ticker',
          order: 'asc',
          limit: 10,
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

  dailyStats = (query: StockDailyStatsQuery) => {
    const yesterday = subDays(new Date(), 1);
    const date = query.date || yesterday;
    const dateFormatted = format(date, 'yyyy-MM-dd');

    return httpClientV1
      .get<PolygonStockDailyStatsApiResponse>(
        `open-close/${query.ticker}/${dateFormatted}`,
        {
          params: {
            adjusted: true,
          },
        }
      )
      .then(({ data }) => ({
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
        volume: data.volume,
      }));
  };
}
