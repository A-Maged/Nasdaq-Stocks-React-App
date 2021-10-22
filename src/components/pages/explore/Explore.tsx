import { MainLayout } from 'components/layout/main';

import { PageStateProvider } from './state';
import { StocksList } from './components/StocksList';
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
        <StocksList />
      </MainLayout>
    </PageStateProvider>
  );
}
