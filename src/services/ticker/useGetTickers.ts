import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { QueryFunction, QueryKey } from 'react-query';

import {
  TickerApiError,
  TickerListReturn,
  PolygonTickerRepo,
} from 'api/repos/TickerRepo';

export function useGetTickers(limit = 10) {
  return useInfiniteQuery<TickerListReturn, AxiosError<TickerApiError>>(
    'tickers',
    makeFetchTickers(limit),
    {
      getNextPageParam: (apiResponse) => apiResponse?.next_url,
      refetchOnMount: false,
    }
  );
}

const polygonTickerRepo = new PolygonTickerRepo();

const makeFetchTickers: MakeFetchTickers =
  (limit: number) =>
  ({ pageParam: nextUrl }) => {
    const url = nextUrl ?? '/reference/tickers';

    return polygonTickerRepo.list({ url, limit });
  };

type MakeFetchTickers = (
  limit: number
) => QueryFunction<TickerListReturn, QueryKey>;
