import { Text, Box } from '@chakra-ui/react';
import React from 'react';

import { Ticker } from 'api/repos/TickerRepo';

type Props = { ticker: Ticker };

function TickerListItem({ ticker }: Props) {
  return (
    <Box w="full" p="8" mx="auto" bg="twitter.800">
      <Text fontSize="lg" fontWeight="bold">
        {ticker.ticker}
      </Text>

      <Text fontSize="sm" color="gray.100" fontWeight="medium">
        {ticker.name}
      </Text>
    </Box>
  );
}

function PropsAreEqual(prevTicker: Props, nextTicker: Props) {
  return prevTicker.ticker === nextTicker.ticker;
}

export const MemoizedTickerListItem = React.memo(TickerListItem, PropsAreEqual);
