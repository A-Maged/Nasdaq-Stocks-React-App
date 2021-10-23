import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { QueryFunction, QueryKey } from 'react-query';
import { useToast } from '@chakra-ui/react';

import {
  polygonStockRepoSingleton,
  StockApiError,
  StockListApiResponse,
  StockListQuery,
} from 'api/repos/stockRepo';

export function useGetStocks(query: Omit<StockListQuery, 'url'>) {
  const toast = useToast();

  return useInfiniteQuery<StockListApiResponse, AxiosError<StockApiError>>(
    'stocks',
    makeFetchStocks(query),
    {
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
  ({ pageParam: nextUrl }) => {
    return polygonStockRepoSingleton.list({ url: nextUrl, ...query });
  };

type MakeFetchStocks = (
  query: Omit<StockListQuery, 'url'>
) => QueryFunction<StockListApiResponse, QueryKey>;
