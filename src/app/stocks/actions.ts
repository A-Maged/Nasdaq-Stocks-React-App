import { Context } from 'app';
import {
  ListStocks,
  SearchStocks,
  StockDailyStats,
  StockDetails,
} from 'types/StockRepo';

import { INITIAL_STATE } from './state';

export const getStocks = async (
  { effects, state }: Context,
  query?: ListStocks.Query
) => {
  state.stocks.list.isLoading = true;

  try {
    const response = await effects.stocks.getRepo().list(query);

    state.stocks.list.data = [...state.stocks.list.data, ...response.results];
    state.stocks.list.nextUrl = response.next_url;
    state.stocks.list.isError = false;
    state.stocks.list.error = null;
  } catch (error) {
    state.stocks.list.isError = true;
    state.stocks.list.error = error as ListStocks.ApiError;
  }

  state.stocks.list.isLoading = false;
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
    const response = await effects.stocks.getRepo().search(query);

    state.stocks.search.data = [...response.results];
    state.stocks.search.isError = false;
    state.stocks.search.error = null;
  } catch (error) {
    state.stocks.search.isError = true;
    state.stocks.search.error = error as ListStocks.ApiError;
  }

  state.stocks.search.isLoading = false;
};

export const getStockDetails = async (
  { effects, state }: Context,
  query: StockDetails.Query
) => {
  state.stocks.currentStock.details.isLoading = true;

  try {
    const response = await effects.stocks.getRepo().details(query);

    state.stocks.currentStock.details = {
      data: { ...response },
      isError: false,
      error: null,
      isLoading: false,
    };
  } catch (error) {
    state.stocks.currentStock.details = {
      data: null,
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
    const response = await effects.stocks.getRepo().dailyStats(query);

    state.stocks.currentStock.dailyStats = {
      isLoading: false,
      data: { ...response },
      isError: false,
      error: null,
    };
  } catch (error) {
    state.stocks.currentStock.dailyStats = {
      isLoading: false,
      data: null,
      isError: true,
      error: error as StockDailyStats.ApiError,
    };
  }
};
