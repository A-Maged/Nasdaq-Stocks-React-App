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
} from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { pageContext, State } from '../state';
import { ErrorMsgWithTryAgainBtn } from './ErrorMsgWithTryAgain';

export function DailyStats() {
  const {
    dailyStats,
    isShowingEarlierStatsDate,
    isFetching,
    isError,
    error,
    refetch,
  } = useContextSelector(pageContext, (state) => ({
    dailyStats: state?.dailyStatsState.data,
    isShowingEarlierStatsDate: state?.isShowingEarlierStatsDate!,
    isFetching: state?.dailyStatsState.isFetching,
    isError: state?.dailyStatsState.isError,
    error: state?.dailyStatsState.error,
    refetch: state?.dailyStatsState.refetch!,
  }));

  function Content() {
    if (isError) {
      const errorMsg =
        error?.response?.data.error || error?.response?.data.message;
      const errorStatusCode = error?.response?.status;

      return (
        <ErrorMsgWithTryAgainBtn
          msg={errorMsg}
          code={errorStatusCode}
          refetch={refetch}
        />
      );
    }

    if (isFetching) {
      return <Loading />;
    }

    return <Stats dailyStats={dailyStats} />;
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

function Loading() {
  return (
    <Center my="10">
      <Spinner />
    </Center>
  );
}

function Stats({
  dailyStats,
}: {
  dailyStats: State['dailyStatsState']['data'];
}) {
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
