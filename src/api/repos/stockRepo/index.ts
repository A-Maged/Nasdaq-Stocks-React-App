import { PolygonStockRepo } from './PolygonStockRepo';
import { StockRepo } from './baseStockRepo';
export * from './baseStockRepo';

export const stocksRepoSingleton: StockRepo = new PolygonStockRepo();
