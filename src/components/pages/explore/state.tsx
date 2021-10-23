import { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { UseInfiniteQueryResult } from 'react-query';
import { AxiosError } from 'axios';

import { useGetStocks } from 'services/stock/useGetStocks';
import { useSearchStocks } from 'services/stock/useSearchStocks';
import { useDebounce } from 'hooks/useDebounce';
import { StockApiError, StockListApiResponse } from 'api/repos/stockRepo';

type State = {
  stocksCount: number | undefined;
  queryState: UseInfiniteQueryResult<
    StockListApiResponse,
    AxiosError<StockApiError, any>
  >;
  setSearchTerm: React.Dispatch<string>;
};

export const pageContext = createContext<State | null>(null);

export const PageStateProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const getStocksState = useGetStocks({ limit: 10 });
  const searchStocksState = useSearchStocks({
    search: debouncedSearchTerm,
  });
  const queryState = debouncedSearchTerm ? searchStocksState : getStocksState;
  const { data: stocks } = queryState;

  const stocksCount = stocks?.pages.reduce((count, { results }) => {
    count += results.length;
    return count;
  }, 0);

  useEffect(
    function refetchSearchQuery() {
      searchStocksState.remove();
      searchStocksState.refetch();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm]
  );

  const contextValue = {
    stocksCount,
    queryState,
    setSearchTerm,
  };

  return (
    <pageContext.Provider value={contextValue}>{children}</pageContext.Provider>
  );
};
