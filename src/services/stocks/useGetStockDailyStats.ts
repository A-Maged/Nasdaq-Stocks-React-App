import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import {
  StockApiError,
  StockDailyStatsApiResponse,
  StockDailyStatsQuery,
  stocksRepoSingleton,
} from 'api';

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
  stocksRepoSingleton.dailyStats(query);
