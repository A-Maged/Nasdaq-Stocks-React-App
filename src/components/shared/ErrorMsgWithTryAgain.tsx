import { Button, Text } from '@chakra-ui/react';
import { StatusCodes } from 'http-status-codes';

type Props = {
  msg?: string;
  code?: number;
  refetch: () => void;
  isLoading: boolean;
  disabled: boolean;
};

export function ErrorMsgWithTryAgainBtn({
  msg,
  code,
  refetch,
  disabled,
  isLoading,
}: Props) {
  const showTryAgainBtn = code === StatusCodes.TOO_MANY_REQUESTS;

  return (
    <>
      <Text color="red" fontSize="sm">
        {msg}
      </Text>

      {showTryAgainBtn && (
        <Button
          onClick={() => refetch()}
          isLoading={isLoading}
          disabled={isLoading}
          w="32"
          size="sm"
          mt="3"
          colorScheme="gray"
          color="black"
          data-testid="refetch-daily-stats"
        >
          Try again
        </Button>
      )}
    </>
  );
}
