import { useInfiniteQuery } from 'react-query';
import { QueryFunction, QueryKey } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { stocksRepoSingleton } from 'api';
import { SearchStocks } from 'types/StockRepo';

export function useSearchStocks(query: Omit<SearchStocks.Query, 'url'>) {
  const toast = useToast();

  return useInfiniteQuery<SearchStocks.ApiResponse, SearchStocks.ApiError>(
    'stocks-search',
    makeFetchStocks(query),
    {
      enabled: !!query.search,
      getNextPageParam: (apiResponse) => apiResponse?.next_url,
      onError: (error) => {
        toast({
          title: error?.response?.data.error,
          status: 'warning',
          isClosable: true,
          position: 'bottom-right',
        });
      },
    }
  );
}

const makeFetchStocks: MakeFetchStocks =
  (query) =>
  ({ pageParam: nextUrl }) =>
    stocksRepoSingleton.search({ url: nextUrl, ...query });

type MakeFetchStocks = (
  query: Omit<SearchStocks.Query, 'url'>
) => QueryFunction<SearchStocks.ApiResponse, QueryKey>;
