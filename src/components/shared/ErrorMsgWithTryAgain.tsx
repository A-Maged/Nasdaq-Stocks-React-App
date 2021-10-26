import { Button, Text } from '@chakra-ui/react';
import { StatusCodes } from 'http-status-codes';

type Props = {
  msg?: string;
  code?: number;
  refetch: () => void;
};

export function ErrorMsgWithTryAgainBtn({ msg, code, refetch }: Props) {
  const showTryAgainBtn = code === StatusCodes.TOO_MANY_REQUESTS;

  return (
    <>
      <Text color="red" fontSize="sm">
        {msg}
      </Text>

      {showTryAgainBtn && (
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
      )}
    </>
  );
}
