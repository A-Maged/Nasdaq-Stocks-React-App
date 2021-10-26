import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { StateProvider } from './StateProvider';

export function GlobalProviders({
  children,
  stateContext,
}: {
  children: ReactNode;
  stateContext?: any;
}) {
  return (
    <StateProvider contextValue={stateContext}>
      <HelmetProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </HelmetProvider>
    </StateProvider>
  );
}
