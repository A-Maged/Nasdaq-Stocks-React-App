import { Text, Box } from '@chakra-ui/react';
import React from 'react';

import { Stock } from 'api/repos/StockRepo';

type Props = { stock: Stock };

function StockListItem({ stock }: Props) {
  return (
    <Box w="full" p="8" mx="auto" bg="twitter.800">
      <Text fontSize="lg" fontWeight="bold">
        {stock.ticker}
      </Text>

      <Text fontSize="sm" color="gray.100" fontWeight="medium">
        {stock.name}
      </Text>
    </Box>
  );
}

function PropsAreEqual(prevStock: Props, nextStock: Props) {
  return prevStock.stock === nextStock.stock;
}

export const MemoizedStockListItem = React.memo(StockListItem, PropsAreEqual);
