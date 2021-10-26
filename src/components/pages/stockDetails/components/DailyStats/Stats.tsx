import { SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

import { useAppState } from 'app';

export function Stats() {
  const { data: dailyStats } = useAppState(
    (state) => state.stocks.currentStock.dailyStats
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
