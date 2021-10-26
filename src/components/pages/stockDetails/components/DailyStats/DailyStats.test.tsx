import { render, screen, waitFor } from '@testing-library/react';
import { StatusCodes } from 'http-status-codes';
import { createOvermindMock } from 'overmind';
import { MemoryRouter } from 'react-router-dom';
import { AxiosError } from 'axios';

import { StateProvider } from 'components/app/StateProvider';
import { config, Context } from 'app';
import { StockDailyStats } from 'types/StockRepo';

import { DailyStats } from './DailyStats';

describe('<DailyStats />', () => {
  test('renders loading', async () => {
    renderWithProviders((state) => {
      state.stocks.currentStock.dailyStats = {
        data: null,
        isLoading: true,
        isError: false,
        error: null,
      };
    });

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('renders daily open/close stats', async () => {
    const mockData = {
      open: 130,
      high: 150,
      low: 120,
      close: 140,
      volume: 222,
    };

    renderWithProviders((state) => {
      state.stocks.currentStock.dailyStats = {
        data: mockData,
        isLoading: false,
        isError: false,
        error: null,
      };
    });

    expect(screen.getByText(mockData.open)).toBeInTheDocument();
    expect(screen.getByText(mockData.close)).toBeInTheDocument();
    expect(screen.getByText(mockData.high)).toBeInTheDocument();
    expect(screen.getByText(mockData.low)).toBeInTheDocument();
    expect(screen.getByText(mockData.volume)).toBeInTheDocument();
  });

  test('renders error msg', async () => {
    const expectedErrorMsg = 'Data not found';

    const error = {
      response: {
        data: {
          error: expectedErrorMsg,
        },
        status: 404,
      },
    } as unknown as AxiosError<StockDailyStats.ApiError>;

    renderWithProviders((state) => {
      state.stocks.currentStock.dailyStats = {
        data: null,
        isLoading: false,
        isError: true,
        error,
      };
    });

    const errorMsgEl = await waitFor(() => screen.getByText(expectedErrorMsg));

    expect(errorMsgEl).toBeInTheDocument();
  });

  test('renders try-again btn on TOO_MANY_REQUESTS error', async () => {
    const expectedErrorMsg = 'too many requests';
    const error = {
      response: {
        status: StatusCodes.TOO_MANY_REQUESTS,
        data: {
          error: expectedErrorMsg,
        },
      },
    } as unknown as AxiosError<StockDailyStats.ApiError>;

    renderWithProviders((state) => {
      state.stocks.currentStock.dailyStats = {
        data: null,
        isLoading: false,
        isError: true,
        error,
      };
    });

    const errorMsgEl = screen.getByText(expectedErrorMsg);
    const tryAgainBtnEl = screen.getByTestId('refetch-daily-stats');

    expect(errorMsgEl).toBeInTheDocument();
    expect(tryAgainBtnEl).toBeInTheDocument();
  });
});

function renderWithProviders(
  setInitialState: (state: Context['state']) => void
) {
  const overmind = createOvermindMock(config, setInitialState);

  return render(
    <MemoryRouter initialEntries={['/stock-details/AAPL']} initialIndex={1}>
      <StateProvider contextValue={overmind}>
        <DailyStats />
      </StateProvider>
    </MemoryRouter>
  );
}
