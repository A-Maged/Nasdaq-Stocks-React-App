import { MainLayout } from 'components/layout/main';

import { PageStateProvider } from './state';
import { TickersList } from './components/TickersList';
import { SearchInput } from './components/SearchInput';

export function Explore() {
  return (
    <PageStateProvider>
      <MainLayout
        pageTitle="Explore"
        wrapperProps={{ color: 'white' }}
        containerProps={{ py: '6' }}
      >
        <SearchInput />
        <TickersList />
      </MainLayout>
    </PageStateProvider>
  );
}
