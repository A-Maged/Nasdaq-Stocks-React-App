import { useParams } from 'react-router-dom';

import { useActions, useAppState } from 'app';
import { ErrorMsgWithTryAgainBtn } from 'components/shared/ErrorMsgWithTryAgain';

export function ErrorState() {
  const { ticker } = useParams<{ ticker: string }>();
  const { stocks: stocksActions } = useActions();
  const { dailyStats } = useAppState((state) => state.stocks.currentStock);

  const { getStockDailyStats } = stocksActions;
  const { error } = dailyStats || {};
  const errorMsg = error?.response?.data.error || error?.response?.data.message;
  const errorStatusCode = error?.response?.status;

  return (
    <ErrorMsgWithTryAgainBtn
      msg={errorMsg}
      code={errorStatusCode}
      refetch={() => getStockDailyStats({ ticker })}
      isLoading={dailyStats.isLoading}
      disabled={dailyStats.isLoading}
    />
  );
}
