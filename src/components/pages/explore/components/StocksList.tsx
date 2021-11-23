import {
  Text,
  Button,
  Spinner,
  Center,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect } from 'react';

import { useActions, useAppState } from 'app';

import { StockListItem } from './StocksListItem';

export function StocksList() {
  const toast = useToast();

  const {
    stocks: { getStocks },
  } = useActions();

  const { listState, searchState } = useAppState((state) => ({
    listState: state.stocks.list,
    searchState: state.stocks.search,
  }));

  const state = searchState.searchTerm ? searchState : listState;

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.error) {
      toast({
        title: state.error?.response?.data.error,
        status: 'warning',
        isClosable: true,
        position: 'bottom-right',
      });
    }
  }, [state.error, toast]);

  function fetchNextPage() {
    if (!searchState.searchTerm) {
      refetch();
    }
  }

  function refetch() {
    getStocks({ url: listState.nextUrl });
  }

  return (
    <>
      <Content />

      {state.isError && !state.isLoading && (
        <Button
          onClick={() => refetch()}
          w="48"
          mx="auto"
          mt="10"
          mb="8"
          colorScheme="gray"
          color="black"
        >
          Try again
        </Button>
      )}
    </>
  );

  function Content() {
    if (state.data.length === 0 && !state.isLoading) {
      return (
        <Center my="10">
          <Text fontWeight="bold">No Data</Text>
        </Center>
      );
    }

    return (
      <InfiniteScroll
        dataLength={state.data.length}
        next={fetchNextPage}
        hasMore={true}
        loader={
          state.isLoading ? (
            <Center my="10">
              <Spinner data-testid="list-spinner" />
            </Center>
          ) : null
        }
      >
        <SimpleGrid columns={[1, 2, 3, 4]} spacingX={10} spacingY={3}>
          {state.data.map((stock) => (
            <StockListItem key={stock.ticker} stock={stock} />
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    );
  }
}
