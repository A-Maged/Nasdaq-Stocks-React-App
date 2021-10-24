import { Box, Button, Center, Heading, Spinner, Text } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { pageContext } from '../state';

export function About() {
  const { stockDetails, isLoading, isError, error, refetch } =
    useContextSelector(pageContext, (state) => ({
      error: state?.stockDetailsState.error,
      isError: state?.stockDetailsState.isError,
      isLoading: state?.stockDetailsState.isLoading,
      stockDetails: state?.stockDetailsState.data,
      refetch: state?.stockDetailsState.refetch!,
    }));

  const errorMsg = error?.response?.data.error || error?.response?.data.message;

  function Content() {
    if (isLoading)
      return (
        <Center my="10">
          <Spinner />
        </Center>
      );

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

    return (
      <>
        {stockDetails?.industry && (
          <Box mb="5">
            <Heading as="h3" size="md" mt="3" mb="2">
              Industry
            </Heading>

            <Text>{stockDetails.industry}</Text>
          </Box>
        )}

        {stockDetails?.description && (
          <Box mb="5">
            <Heading as="h3" size="md" mt="2" mb="1">
              Description
            </Heading>

            <Text>{stockDetails.description}</Text>
          </Box>
        )}
      </>
    );
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
