import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { QueryClient } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from '../routes';
import { GlobalProviders } from './GlobalProviders';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: (attemptsCount, error) => {
        if (attemptsCount > 2) {
          return false;
        }

        const statusCode = (error as AxiosError).response?.status;
        if (statusCode === StatusCodes.TOO_MANY_REQUESTS) {
          return true;
        }

        return false;
      },
    },
  },
});

export function App() {
  return (
    <GlobalProviders>
      <Router>
        <Routes />
      </Router>
    </GlobalProviders>
  );
}
