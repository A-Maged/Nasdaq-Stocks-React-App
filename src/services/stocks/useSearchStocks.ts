import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { QueryFunction, QueryKey } from 'react-query';
import { useToast } from '@chakra-ui/react';

import {
  stocksRepoSingleton,
  StockApiError,
  StockListApiResponse,
  StockSearchQuery,
} from 'api';

export function useSearchStocks(query: Omit<StockSearchQuery, 'url'>) {
  const toast = useToast();

  return useInfiniteQuery<StockListApiResponse, AxiosError<StockApiError>>(
    'stocks-search',
    makeFetchStocks(query),
    {
      enabled: !!query.search,
      getNextPageParam: (apiResponse) => apiResponse?.next_url,
      refetchOnMount: false,
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
  query: Omit<StockSearchQuery, 'url'>
) => QueryFunction<StockListApiResponse, QueryKey>;
