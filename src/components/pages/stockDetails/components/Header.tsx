import { HStack, Link, Text, VStack } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { ImageWithFallback } from 'components/shared/ImageWithFallback';

import { pageContext } from '../state';

export function Header() {
  const { stockDetails, ticker } = useContextSelector(pageContext, (state) => ({
    ticker: state?.ticker,
    stockDetails: state?.stockDetailsState.data,
  }));

  const urlPrefix = String(stockDetails?.url).startsWith('http') ? '' : '//';

  return (
    <HStack spacing="6">
      <ImageWithFallback src={stockDetails?.logo} name={stockDetails?.name} />

      <VStack spacing="1" alignItems="flex-start">
        <Text fontWeight="bold">{ticker}</Text>
        <Text>{stockDetails?.name}</Text>

        {stockDetails?.url && (
          <Link
            href={urlPrefix + stockDetails.url}
            isExternal
            color="blue"
            fontWeight="bold"
          >
            View website
          </Link>
        )}
      </VStack>
    </HStack>
  );
}
