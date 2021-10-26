import { useInfiniteQuery } from 'react-query';
import { QueryFunction, QueryKey } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { stocksRepoSingleton } from 'api';
import { ListStocks } from 'types/StockRepo';

export function useGetStocks(query: Omit<ListStocks.Query, 'url'>) {
  const toast = useToast();

  return useInfiniteQuery<ListStocks.ApiResponse, ListStocks.ApiError>(
    'stocks',
    makeFetchStocks(query),
    {
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
  ({ pageParam: nextUrl }) => {
    return stocksRepoSingleton.list({ url: nextUrl, ...query });
  };

type MakeFetchStocks = (
  query: Omit<ListStocks.Query, 'url'>
) => QueryFunction<ListStocks.ApiResponse, QueryKey>;
