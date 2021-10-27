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
    const response = await effects.stocks.repo.search(query);

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
    const response = await effects.stocks.repo.details(query);

    state.stocks.currentStock.details.data = { ...response };
    state.stocks.currentStock.details.isError = false;
    state.stocks.currentStock.details.error = null;
  } catch (error) {
    state.stocks.currentStock.details.isError = true;
    state.stocks.currentStock.details.error = error as StockDetails.ApiError;
  }

  state.stocks.currentStock.details.isLoading = false;
};

export const resetCurrentStock = ({ state }: Context) => {
  state.stocks.currentStock.details = {
    ...INITIAL_STATE.currentStock.details,
  };

  state.stocks.currentStock.dailyStats = {
    ...INITIAL_STATE.currentStock.dailyStats,
  };
};

export const getStockDailyStats = async (
  { effects, state }: Context,
  query: StockDailyStats.Query
) => {
  state.stocks.currentStock.dailyStats.isLoading = true;

  try {
    const response = await effects.stocks.repo.dailyStats(query);

    state.stocks.currentStock.dailyStats.data = { ...response };
    state.stocks.currentStock.dailyStats.isError = false;
    state.stocks.currentStock.dailyStats.error = null;
  } catch (error) {
    state.stocks.currentStock.dailyStats.isError = true;
    state.stocks.currentStock.dailyStats.error =
      error as StockDailyStats.ApiError;
  }

  state.stocks.currentStock.dailyStats.isLoading = false;
};
