import { useQuery } from 'react-query';

import { stocksRepoSingleton } from 'api';
import { StockDetails } from 'types/StockRepo';

export function useGetStockDetails(query: StockDetails.Query) {
  return useQuery<StockDetails.ApiResponse, StockDetails.ApiError>(
    ['Stock-details', query.ticker],
    () => stocksRepoSingleton.details(query),
    {
      enabled: !!query.ticker,
    }
  );
}
