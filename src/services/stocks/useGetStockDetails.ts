import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import {
  stocksRepoSingleton,
  StockApiError,
  StockDetailsApiResponse,
  StockDetailsQuery,
} from 'api';

export function useGetStockDetails(query: StockDetailsQuery) {
  return useQuery<StockDetailsApiResponse, AxiosError<StockApiError>>(
    ['Stock-details', query.ticker],
    () => stocksRepoSingleton.details(query),
    {
      enabled: !!query.ticker,
    }
  );
}
