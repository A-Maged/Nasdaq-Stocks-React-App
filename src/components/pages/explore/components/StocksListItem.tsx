import { Text, Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Stock } from 'api/repos/stockRepo/baseStockRepo';

type Props = { stock: Stock };

function StockListItem({ stock }: Props) {
  return (
    <Box w="full" p="2" mx="auto" color="white" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold">
        <Link to={`/stock-details/${stock.ticker}`}>{stock.ticker}</Link>
      </Text>

      <Text
        noOfLines={1}
        cursor="default"
        color="gray.100"
        fontSize="sm"
        fontWeight="medium"
      >
        {stock.name}
      </Text>
    </Box>
  );
}

function PropsAreEqual(prevStock: Props, nextStock: Props) {
  return prevStock.stock === nextStock.stock;
}

export const MemoizedStockListItem = React.memo(StockListItem, PropsAreEqual);
