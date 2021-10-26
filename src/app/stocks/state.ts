import { ListStocks, StockDailyStats, StockDetails } from 'types/StockRepo';

type State = {
  list: Query<ListStocks.ApiError> & {
    data: ListStocks.Stock[];
    nextUrl: string | null;
  };
  search: Query<ListStocks.ApiError> & {
    searchTerm: string;
    data: ListStocks.Stock[];
  };
  currentStock: {
    details: Query<StockDetails.ApiError> & {
      data: StockDetails.ApiResponse | null;
    };
    dailyStats: Query<StockDailyStats.ApiError> & {
      data: StockDailyStats.ApiResponse | null;
    };
  };
};

type Query<Error = any> = {
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
