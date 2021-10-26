import { Box, Center, Heading, Spinner } from '@chakra-ui/react';

import { useAppState } from 'app';

import { Details } from './Details';
import { ErrorState } from './ErrorState';

export function About() {
  const { details } = useAppState((state) => state.stocks.currentStock);

  function Content() {
    if (details.isError) {
      return <ErrorState />;
    }

    if (details.isLoading) {
      return (
        <Center my="10">
          <Spinner />
        </Center>
      );
    }

    return <Details />;
  }

  return (
    <Box mt="10">
      <Heading as="h2" size="lg" mb="3">
        About
      </Heading>

      <Content />
    </Box>
  );
}
