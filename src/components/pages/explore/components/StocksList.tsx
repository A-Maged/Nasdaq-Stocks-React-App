import { Button, Spinner, Center, SimpleGrid } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useContextSelector } from 'use-context-selector';

import { MemoizedStockListItem } from './StocksListItem';
import { pageContext } from '../state';

export function StocksList() {
  const stocksCount = useContextSelector(
    pageContext,
    (v) => v?.stocksCount || 0
  );

  const { stocks, fetchNextPage, isFetching, isError } = useContextSelector(
    pageContext,
    (v) => ({
      stocks: v?.queryState.data!,
      fetchNextPage: v?.queryState.fetchNextPage!,
      isFetching: v?.queryState.isFetching!,
      isError: v?.queryState.isError!,
    })
  );

  return (
    <>
      <InfiniteScroll
        dataLength={stocksCount} // This is important field to render the next data
        next={fetchNextPage}
        hasMore={true}
        loader={
          isFetching ? (
            <Center my="10">
              <Spinner />
            </Center>
          ) : null
        }
      >
        <SimpleGrid columns={[1, 2, 3, 4]} spacingX={10} spacingY={3}>
          {stocks?.pages.map((page) =>
            page.results.map((stock) => (
              <MemoizedStockListItem key={stock.ticker} stock={stock} />
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
