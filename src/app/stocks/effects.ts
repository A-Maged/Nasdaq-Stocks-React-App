import { PolygonStockRepo } from 'api';
import { StockRepo } from 'types/StockRepo';

export const getRepo = (function () {
  let repoInstance: StockRepo;

  return () => {
    if (!repoInstance) {
      repoInstance = new PolygonStockRepo();
    }

    return repoInstance;
  };
})();
