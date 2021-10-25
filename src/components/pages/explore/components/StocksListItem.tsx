import { Text, Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Stock } from 'api';

type Props = { stock: Stock };

export const StockListItem = React.memo(function StockListItem({
  stock,
}: Props) {
  return (
    <Box w="full" p="2" mx="auto" color="white" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold">
        <Link to={`/stock-details/${stock.ticker}`} data-testid="stock-ticker">
          {stock.ticker}
        </Link>
      </Text>

      <Text
        data-testid="stock-company-name"
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
},
PropsAreEqual);

function PropsAreEqual(prevStock: Props, nextStock: Props) {
  return prevStock.stock === nextStock.stock;
}
