import { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { UseInfiniteQueryResult } from 'react-query';

import { useGetStocks } from 'services/stocks/useGetStocks';
import { useSearchStocks } from 'services/stocks/useSearchStocks';
import { useDebounce } from 'hooks/useDebounce';
import { ListStocks } from 'types/StockRepo';

type State = {
  stocksCount: number | undefined;
  queryState: UseInfiniteQueryResult<
    ListStocks.ApiResponse,
    ListStocks.ApiError
  >;
  setSearchTerm: React.Dispatch<string>;
};

export const pageContext = createContext<State | null>(null);

export const PageStateProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const getStocksState = useGetStocks({ limit: 40 });
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
      if (debouncedSearchTerm) {
        searchStocksState.remove();
        searchStocksState.refetch();
      }
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
