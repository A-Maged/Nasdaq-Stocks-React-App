import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import {
  polygonStockRepoSingleton,
  StockApiError,
  StockDailyStatsApiResponse,
  StockDailyStatsQuery,
} from 'api/repos/stockRepo';

export function useGetStockDailyStats(query: StockDailyStatsQuery) {
  return useQuery<StockDailyStatsApiResponse, AxiosError<StockApiError>>(
    ['Stock-daily', query.ticker],
    makeFetch(query),
    {
      enabled: !!query.ticker,
    }
  );
}

const makeFetch = (query: StockDailyStatsQuery) => () =>
  polygonStockRepoSingleton.dailyStats(query);
