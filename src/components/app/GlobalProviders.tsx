import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';

import { queryClient } from './App';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
