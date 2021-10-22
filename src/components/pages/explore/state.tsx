import { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { UseInfiniteQueryResult } from 'react-query';
import { AxiosError } from 'axios';

import { useGetTickers } from 'services/ticker/useGetTickers';
import { useSearchTickers } from 'services/ticker/useSearchTickers';
import { useDebounce } from 'hooks/useDebounce';
import { TickerApiError, TickerListApiResponse } from 'api/repos/TickerRepo';

type State = {
  tickersCount: number | undefined;
  queryState: UseInfiniteQueryResult<
    TickerListApiResponse,
    AxiosError<TickerApiError, any>
  >;
  setSearchTerm: React.Dispatch<string>;
};

export const pageContext = createContext<State | null>(null);

export const PageStateProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const getTickersState = useGetTickers({ limit: 10 });
  const searchTickersState = useSearchTickers({
    search: debouncedSearchTerm,
  });
  const queryState = debouncedSearchTerm ? searchTickersState : getTickersState;
  const { data: tickers } = queryState;

  const tickersCount = tickers?.pages.reduce((count, { results }) => {
    count += results.length;
    return count;
  }, 0);

  useEffect(
    function refetchSearchQuery() {
      searchTickersState.remove();
      searchTickersState.refetch();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm]
  );

  const contextValue = {
    tickersCount,
    queryState,
    setSearchTerm,
  };

  return (
    <pageContext.Provider value={contextValue}>{children}</pageContext.Provider>
  );
};
