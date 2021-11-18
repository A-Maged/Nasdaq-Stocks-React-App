import { Text, Button, Spinner, Center, SimpleGrid } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useContextSelector } from 'use-context-selector';

import { StockListItem } from './StocksListItem';
import { pageContext } from '../state';

export function StocksList() {
  const { stocksCount, stocks, fetchNextPage, isFetching, isError } =
    useContextSelector(pageContext, (state) => ({
      stocksCount: state?.stocksCount || 0,
      stocks: state?.queryState.data!,
      fetchNextPage: state?.queryState.fetchNextPage!,
      isFetching: state?.queryState.isFetching!,
      isError: state?.queryState.isError!,
    }));

  const isListEmpty =
    stocks?.pages.reduce(
      (count, page) => (count += page.results.length || 0),
      0
    ) === 0;

  return (
    <>
      {isListEmpty && (
        <Center my="10">
          <Text fontWeight="bold">No Data</Text>
        </Center>
      )}

      <InfiniteScroll
        dataLength={stocksCount}
        next={fetchNextPage}
        hasMore={true}
        loader={
          isFetching ? (
            <Center my="10">
              <Spinner data-testid="list-spinner" />
            </Center>
          ) : null
        }
      >
        <SimpleGrid columns={[1, 2, 3, 4]} spacingX={10} spacingY={3}>
          {stocks?.pages?.map((page) =>
            page.results?.map((stock) => (
              <StockListItem key={stock.ticker} stock={stock} />
            ))
          )}
        </SimpleGrid>
      </InfiniteScroll>

      {isError && (
        <Button
          disabled={isFetching}
          isLoading={isFetching}
          w="48"
          mx="auto"
          mt="10"
          mb="8"
          colorScheme="gray"
          color="black"
          onClick={() => fetchNextPage()}
        >
          Try again
        </Button>
      )}
    </>
  );
}
