import { Context } from 'app';
import {
  ListStocks,
  SearchStocks,
  StockDailyStats,
  StockDetails,
} from 'types/StockRepo';

import { INITIAL_STATE } from './state';

/* 
  Downsides:
    - managing query state(loading, error, etc) manually, which is error prone and could lead to bugs.
*/

/* initialize effects, so no state would leak into tests */
export const onInitializeOvermind = async ({ effects }: Context) => {
  effects.stocks.init();
};

export const getStocks = async (
  { effects, state }: Context,
  query?: ListStocks.Query
) => {
  state.stocks.list.isLoading = true;

  try {
    const response = await effects.stocks.repo.list(query);

    state.stocks.list = {
      data: [...state.stocks.list.data, ...response.results],
      nextUrl: response.next_url,
      isError: false,
      error: null,
      isLoading: false,
    };
  } catch (error) {
    state.stocks.list = {
      ...state.stocks.list,
      nextUrl: null,
      isError: true,
      error: error as ListStocks.ApiError,
      isLoading: false,
    };
  }
};

export const searchStocks = async (
  { effects, state }: Context,
  query: SearchStocks.Query
) => {
  state.stocks.search.searchTerm = query.search;

  if (!query.search) {
    return;
  }

  state.stocks.search.isLoading = true;

  try {
    const response = await effects.stocks.repo.search(query);

    state.stocks.search = {
      ...state.stocks.search,
      data: [...response.results],
      isError: false,
      error: null,
      isLoading: false,
      searchTerm: query.search,
    };
  } catch (error) {
    state.stocks.search = {
      ...state.stocks.search,
      isError: true,
      error: error as ListStocks.ApiError,
      isLoading: false,
      searchTerm: query.search,
    };
  }

  state.stocks.search.isLoading = false;
};

export const getStockDetails = async (
  { effects, state }: Context,
  query: StockDetails.Query
) => {
  state.stocks.currentStock.details.isLoading = true;

  try {
    const response = await effects.stocks.repo.details(query);

    state.stocks.currentStock.details = {
      data: { ...response },
      isError: false,
      error: null,
      isLoading: false,
    };
  } catch (error) {
    state.stocks.currentStock.details = {
      ...state.stocks.currentStock.details,
      isError: true,
      error: error as StockDetails.ApiError,
      isLoading: false,
    };
  }
};

export const resetCurrentStock = ({ state }: Context) => {
  state.stocks.currentStock = {
    ...INITIAL_STATE.currentStock,
  };
};

export const getStockDailyStats = async (
  { effects, state }: Context,
  query: StockDailyStats.Query
) => {
  state.stocks.currentStock.dailyStats.isLoading = true;

  try {
    const response = await effects.stocks.repo.dailyStats(query);

    state.stocks.currentStock.dailyStats = {
      isLoading: false,
      data: { ...response },
      isError: false,
      error: null,
    };
  } catch (error) {
    state.stocks.currentStock.dailyStats = {
      ...state.stocks.currentStock.dailyStats,
      isLoading: false,
      isError: true,
      error: error as StockDailyStats.ApiError,
    };
  }
};
