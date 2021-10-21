import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from '../routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export function App() {
  return (
    <HelmetProvider>
      <ChakraProvider>
        <Router>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </Router>
      </ChakraProvider>
    </HelmetProvider>
  );
}
