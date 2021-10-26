import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';

import { queryClient as apiQueryClient } from 'api';

import { StateProvider } from './StateProvider';

export function GlobalProviders({
  children,
  stateContext,
  queryClient,
}: {
  children: ReactNode;
  queryClient?: QueryClient;
  stateContext?: any;
}) {
  return (
    <StateProvider contextValue={stateContext}>
      <QueryClientProvider client={queryClient || apiQueryClient}>
        <HelmetProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </StateProvider>
  );
}
