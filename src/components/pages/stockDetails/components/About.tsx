import { Box, Center, Heading, Spinner, Text } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { pageContext } from '../state';
import { ErrorMsgWithTryAgainBtn } from './ErrorMsgWithTryAgain';

export function About() {
  const { stockDetails, isLoading, isError, error, refetch } =
    useContextSelector(pageContext, (state) => ({
      error: state?.stockDetailsState.error,
      isError: state?.stockDetailsState.isError,
      isLoading: state?.stockDetailsState.isLoading,
      stockDetails: state?.stockDetailsState.data,
      refetch: state?.stockDetailsState.refetch!,
    }));

  function Content() {
    if (isLoading) {
      return (
        <Center my="10">
          <Spinner />
        </Center>
      );
    }

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
