import { dailyStats } from './dailyStats';
import { stockDetails } from './details';
import { listStocks } from './list';
import { searchStocks } from './search';

export interface StockRepo {
  list: listStocks;
  search: searchStocks;
  details: stockDetails;
  dailyStats: dailyStats;
}
