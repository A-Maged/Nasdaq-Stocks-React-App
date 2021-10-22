import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { QueryFunction, QueryKey } from 'react-query';
import { useToast } from '@chakra-ui/react';

import {
  TickerApiError,
  TickerListApiResponse,
  PolygonTickerRepo,
  TickerSearchQuery,
} from 'api/repos/TickerRepo';

export function useSearchTickers(query: Omit<TickerSearchQuery, 'url'>) {
  const toast = useToast();

  return useInfiniteQuery<TickerListApiResponse, AxiosError<TickerApiError>>(
    'tickers-search',
    makeFetchTickers(query),
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

const polygonTickerRepo = new PolygonTickerRepo();

const makeFetchTickers: MakeFetchTickers =
  (query) =>
  ({ pageParam: nextUrl }) =>
    polygonTickerRepo.search({ url: nextUrl, ...query });

type MakeFetchTickers = (
  query: Omit<TickerSearchQuery, 'url'>
) => QueryFunction<TickerListApiResponse, QueryKey>;
