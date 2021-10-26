import { format, subDays } from 'date-fns';

import { httpClientV1, httpClientV3 } from 'api';
import {
  StockRepo,
  SearchStocks,
  ListStocks,
  StockDailyStats,
  StockDetails,
} from 'types/StockRepo';

import * as Polygon from './types';

export class PolygonStockRepo implements StockRepo {
  search = ({ url: nextPageUrl, ...query }: SearchStocks.Query) => {
    const url = nextPageUrl ?? '/reference/tickers';

    return httpClientV3
      .get<Polygon.StocksApiResponse>(url, {
        params: {
          market: 'stocks',
          active: true,
          sort: 'ticker',
          order: 'asc',
          limit: 40,
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

  details = ({ ticker }: StockDetails.Query) => {
    return httpClientV1
      .get<Polygon.StockDetailsApiResponse>(`/meta/symbols/${ticker}/company`)
      .then(({ data }) => ({
        name: data.name,
        symbol: data.symbol,
        description: data.description,
        logo: data.logo,
        url: data.url,
        industry: data.industry,
      }));
  };

  list = ({ url: nextPageUrl, ...query }: ListStocks.Query = {}) => {
    const url = nextPageUrl ?? '/reference/tickers';

    return httpClientV3
      .get<Polygon.StocksApiResponse>(url, {
        params: {
          market: 'stocks',
          active: true,
          sort: 'ticker',
          order: 'asc',
          limit: 40,
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

  dailyStats = (query: StockDailyStats.Query) => {
    const yesterday = subDays(new Date(), 1);
    const date = query.date || yesterday;
    const dateFormatted = format(date, 'yyyy-MM-dd');

    return httpClientV1
      .get<Polygon.StockDailyStatsApiResponse>(
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
