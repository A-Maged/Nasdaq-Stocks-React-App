import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import {
  polygonStockRepoSingleton,
  StockApiError,
  StockDetailsApiResponse,
  StockDetailsQuery,
} from 'api/repos/stockRepo';

export function useGetStockDetails(query: StockDetailsQuery) {
  return useQuery<StockDetailsApiResponse, AxiosError<StockApiError>>(
    ['Stock-details', query.ticker],
    () => polygonStockRepoSingleton.details(query),
    {
      enabled: !!query.ticker,
    }
  );
}
