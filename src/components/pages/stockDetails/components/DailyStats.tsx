import {
  Text,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Box,
  Center,
  Spinner,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { pageContext } from '../state';

export function DailyStats() {
  const {
    dailyStats,
    isShowingEarlierStatsDate,
    isFetching,
    isError,
    error,
    refetch,
  } = useContextSelector(pageContext, (v) => ({
    dailyStats: v?.dailyStatsState.data,
    isShowingEarlierStatsDate: v?.isShowingEarlierStatsDate!,
    isFetching: v?.dailyStatsState.isFetching,
    isError: v?.dailyStatsState.isError,
    error: v?.dailyStatsState.error,
    refetch: v?.dailyStatsState.refetch!,
  }));

  const errorMsg = error?.response?.data.error || error?.response?.data.message;

  function Content() {
    if (isError) {
      const ErrorMsg = () => (
        <Text color="red" fontSize="sm">
          {errorMsg}
        </Text>
      );

      if (error?.response?.status === 429) {
        return (
          <>
            <ErrorMsg />

            <Button
              w="32"
              size="sm"
              mt="3"
              colorScheme="gray"
              color="black"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </>
        );
      }

      return <ErrorMsg />;
    }

    if (isFetching)
      return (
        <Center my="10">
          <Spinner />
        </Center>
      );

    return (
      <SimpleGrid columns={[2, 3, 4, 5]}>
        {dailyStats?.open && (
          <Stat>
            <StatLabel>Open</StatLabel>
            <StatNumber fontSize="xl">{dailyStats?.open}</StatNumber>
          </Stat>
        )}

        {dailyStats?.close && (
          <Stat>
            <StatLabel>Close</StatLabel>
            <StatNumber fontSize="xl">{dailyStats?.close}</StatNumber>
          </Stat>
        )}

        {dailyStats?.volume && (
          <Stat>
            <StatLabel>Volume</StatLabel>
            <StatNumber fontSize="xl">{dailyStats?.volume}</StatNumber>
          </Stat>
        )}

        {dailyStats?.high && (
          <Stat>
            <StatLabel>High</StatLabel>
            <StatNumber fontSize="xl">{dailyStats?.high}</StatNumber>
          </Stat>
        )}

        {dailyStats?.low && (
          <Stat>
            <StatLabel>Low</StatLabel>
            <StatNumber fontSize="xl">{dailyStats?.low}</StatNumber>
          </Stat>
        )}
      </SimpleGrid>
    );
  }

  return (
    <Box mt="10">
      <HStack d="flex" alignItems="center" mb="4">
        <Heading as="h2" size="lg">
          Statistics
        </Heading>

        {isShowingEarlierStatsDate && (
          <Text fontSize="xs" fontWeight="normal" color="gray.200">
            (showing stats for earlier date)
          </Text>
        )}
      </HStack>

      <Content />
    </Box>
  );
}
