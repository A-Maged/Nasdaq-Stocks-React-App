import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useActions } from 'app';
import { MainLayout } from 'components/layouts/main';

import { About } from './components/About';
import { DailyStats } from './components/DailyStats';
import { Header } from './components/Header';

export function StockDetails() {
  const { ticker } = useParams<{ ticker: string }>();

  const {
    stocks: { getStockDetails, getStockDailyStats, resetCurrentStock },
  } = useActions();

  useEffect(() => {
    getStockDetails({ ticker });
    getStockDailyStats({ ticker });

    return () => {
      resetCurrentStock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout
      pageTitle="Stock Details"
      wrapperProps={{ color: 'white' }}
      containerProps={{ pt: '16', pb: '6', maxW: '2xl' }}
    >
      <Header />
      <DailyStats />
      <About />
    </MainLayout>
  );
}
