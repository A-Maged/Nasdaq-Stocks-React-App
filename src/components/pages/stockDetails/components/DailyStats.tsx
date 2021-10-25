import { StatusCodes } from 'http-status-codes';
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

import { pageContext, State } from '../state';

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

  const errorMsg = error?.response?.data.error || error?.response?.data.message;
  const errorStatusCode = error?.response?.status;

  function Content() {
    if (isError)
      return <Error msg={errorMsg} code={errorStatusCode} refetch={refetch} />;

    if (isFetching) return <Loading />;

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

function Error({
  msg,
  code,
  refetch,
}: {
  msg?: string;
  code?: number;
  refetch: () => void;
}) {
  const ErrorMsg = () => (
    <Text color="red" fontSize="sm">
      {msg}
    </Text>
  );

  if (code === StatusCodes.TOO_MANY_REQUESTS) {
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
          data-testid="refetch-daily-stats"
        >
          Try again
        </Button>
      </>
    );
  }

  return <ErrorMsg />;
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
