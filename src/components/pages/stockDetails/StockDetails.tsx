import { MainLayout } from 'components/layouts/main';

import { About } from './components/About';
import { DailyStats } from './components/DailyStats';
import { Header } from './components/Header';
import { PageStateProvider } from './state';

export function StockDetails() {
  return (
    <PageStateProvider>
      <MainLayout
        pageTitle="Stock Details"
        wrapperProps={{ color: 'white' }}
        containerProps={{ pt: '16', pb: '6', maxW: '2xl' }}
      >
        <Header />

        <DailyStats />

        <About />
      </MainLayout>
    </PageStateProvider>
  );
}
