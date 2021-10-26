import { Box, Heading, Text } from '@chakra-ui/react';

import { useAppState } from 'app';

export function Details() {
  const { details } = useAppState((state) => state.stocks.currentStock);
  const { data } = details || {};

  return (
    <>
      {data?.industry && (
        <Box mb="5">
          <Heading as="h3" size="md" mt="3" mb="2">
            Industry
          </Heading>

          <Text>{data.industry}</Text>
        </Box>
      )}

      {data?.description && (
        <Box mb="5">
          <Heading as="h3" size="md" mt="2" mb="1">
            Description
          </Heading>

          <Text>{data.description}</Text>
        </Box>
      )}
    </>
  );
}
