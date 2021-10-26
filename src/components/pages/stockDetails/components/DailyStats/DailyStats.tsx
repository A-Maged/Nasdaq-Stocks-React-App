import { Heading, Box, Center, Spinner } from '@chakra-ui/react';

import { useAppState } from 'app';

import { Stats } from './Stats';
import { ErrorState } from './ErrorState';

export function DailyStats() {
  const { dailyStats } = useAppState((state) => state.stocks.currentStock);

  function Content() {
    if (dailyStats.isError) {
      return <ErrorState />;
    }

    if (dailyStats.isLoading) {
      return (
        <Center my="10">
          <Spinner />
        </Center>
      );
    }

    return <Stats />;
  }

  return (
    <Box mt="10">
      <Heading as="h2" size="lg">
        Statistics
      </Heading>

      <Content />
    </Box>
  );
}
