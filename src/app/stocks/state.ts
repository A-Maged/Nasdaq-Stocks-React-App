import { ListStocks, StockDailyStats, StockDetails } from 'types/StockRepo';

export type State = {
  list: Query<ListStocks.Stock[], ListStocks.ApiError> & {
    nextUrl: string | null;
  };
  search: Query<ListStocks.Stock[], ListStocks.ApiError> & {
    searchTerm: string;
  };
  currentStock: {
    details: Query<StockDetails.ApiResponse | null, StockDetails.ApiError>;
    dailyStats: Query<
      StockDailyStats.ApiResponse | null,
      StockDailyStats.ApiError
    >;
  };
};

type Query<Data = any, Error = any> = {
  data: Data;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export const INITIAL_STATE: State = {
  list: {
    data: [],
    nextUrl: null,
    isLoading: false,
    isError: false,
    error: null,
  },
  search: {
    searchTerm: '',
    data: [],
    isLoading: false,
    isError: false,
    error: null,
  },
  currentStock: {
    details: {
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    },
    dailyStats: {
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    },
  },
};

export const state: State = {
  ...INITIAL_STATE,
};
