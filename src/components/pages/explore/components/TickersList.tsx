import { Button, Spinner, Center, SimpleGrid } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useContextSelector } from 'use-context-selector';

import { MemoizedTickerListItem } from './TickerListItem';
import { pageContext } from '../state';

export function TickersList() {
  const tickersCount = useContextSelector(
    pageContext,
    (v) => v?.tickersCount || 0
  );

  const { tickers, fetchNextPage, isFetching, isError } = useContextSelector(
    pageContext,
    (v) => ({
      tickers: v?.queryState.data!,
      fetchNextPage: v?.queryState.fetchNextPage!,
      isFetching: v?.queryState.isFetching!,
      isError: v?.queryState.isError!,
    })
  );

  return (
    <>
      <InfiniteScroll
        dataLength={tickersCount} // This is important field to render the next data
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
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={7}>
          {tickers?.pages.map((page) =>
            page.results.map((ticker) => (
              <MemoizedTickerListItem key={ticker.ticker} ticker={ticker} />
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
