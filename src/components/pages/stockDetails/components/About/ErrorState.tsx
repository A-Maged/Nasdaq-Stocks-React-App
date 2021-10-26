import { useParams } from 'react-router';

import { useActions, useAppState } from 'app';
import { ErrorMsgWithTryAgainBtn } from 'components/shared/ErrorMsgWithTryAgain';

export function ErrorState() {
  const {
    stocks: { getStockDetails },
  } = useActions();
  const { ticker } = useParams<{ ticker: string }>();
  const { details } = useAppState((state) => state.stocks.currentStock);

  const { error } = details || {};
  const errorMsg = error?.response?.data.error || error?.response?.data.message;
  const errorStatusCode = error?.response?.status;

  return (
    <ErrorMsgWithTryAgainBtn
      msg={errorMsg}
      code={errorStatusCode}
      refetch={() => getStockDetails({ ticker })}
    />
  );
}
