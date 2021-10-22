import {
  Text,
  Button,
  Box,
  Spinner,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { MainLayout } from 'components/layout/main';
import { useGetTickers } from 'services/ticker/useGetTickers';

export function Explore() {
  const {
    data: tickers,
    fetchNextPage,
    isError,
    isFetching,
  } = useGetTickers(30);

  const tickersCount =
    tickers?.pages.reduce((count, { results }) => {
      count += results.length;
      return count;
    }, 0) || 0;

  return (
    <MainLayout
      pageTitle="Explore"
      wrapperProps={{ color: 'white' }}
      containerProps={{ py: '6' }}
    >
      <InfiniteScroll
        dataLength={tickersCount} // This is important field to render the next data
        next={fetchNextPage}
        hasMore={!isError}
        loader={
          <Center my="10">
            <Spinner />
          </Center>
        }
      >
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={7}>
          {tickers?.pages.map((page) =>
            page.results.map((ticker) => (
              <Box
                key={ticker.ticker}
                w="full"
                p="8"
                mx="auto"
                bg="twitter.800"
              >
                <Text fontSize="lg" fontWeight="bold">
                  {ticker.ticker}
                </Text>

                <Text fontSize="sm" color="gray.100" fontWeight="medium">
                  {ticker.name}
                </Text>
              </Box>
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
          load more
        </Button>
      )}
    </MainLayout>
  );
}
