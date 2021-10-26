import { PolygonStockRepo } from 'api';
import { StockRepo } from 'types/StockRepo';

export let repo: StockRepo;

export function init() {
  repo = new PolygonStockRepo();
}
