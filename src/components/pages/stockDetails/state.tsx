import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createContext } from 'use-context-selector';
import { UseQueryResult } from 'react-query';
import { subDays } from 'date-fns';

import { useGetStockDailyStats } from 'services/stocks/useGetStockDailyStats';
import { useGetStockDetails } from 'services/stocks/useGetStockDetails';
import { StockDailyStats, StockDetails } from 'types/StockRepo';

export type State = {
  ticker: string;
  stockDetailsState: UseQueryResult<
    StockDetails.ApiResponse,
    StockDetails.ApiError
  >;
  dailyStatsState: UseQueryResult<
    StockDailyStats.ApiResponse,
    StockDailyStats.ApiError
  >;
  isShowingEarlierStatsDate: boolean;
};

export const pageContext = createContext<State | null>(null);

const dayBeforeYesterday = subDays(new Date(), 2);

export const PageStateProvider = ({ children }: { children: ReactNode }) => {
  const { ticker } = useParams<{ ticker: string }>();
  const [date, setDate] = useState<Date | undefined>();
  const stockDetailsState = useGetStockDetails({ ticker });
  const dailyStatsState = useGetStockDailyStats({ ticker, date });

  useEffect(() => {
    if (dailyStatsState.isError) {
      setDate(dayBeforeYesterday);
    }
  }, [dailyStatsState.isError]);

  useEffect(() => {
    if (date) {
      dailyStatsState.refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const contextValue = {
    ticker,
    stockDetailsState,
    dailyStatsState,
    isShowingEarlierStatsDate: !!(date && dailyStatsState.isSuccess),
  };

  return (
    <pageContext.Provider value={contextValue}>{children}</pageContext.Provider>
  );
};
