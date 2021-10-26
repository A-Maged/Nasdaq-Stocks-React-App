import { useQuery } from 'react-query';

import { stocksRepoSingleton } from 'api';
import { StockDailyStats } from 'types/StockRepo';

export function useGetStockDailyStats(query: StockDailyStats.Query) {
  return useQuery<StockDailyStats.ApiResponse, StockDailyStats.ApiError>(
    ['Stock-daily', query.ticker],
    makeFetch(query),
    {
      enabled: !!query.ticker,
    }
  );
}

const makeFetch = (query: StockDailyStats.Query) => () =>
  stocksRepoSingleton.dailyStats(query);
