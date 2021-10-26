import { MainLayout } from 'components/layouts/main';

import { StocksList } from './components/StocksList';
import { SearchInput } from './components/SearchInput';

export function Explore() {
  return (
    <MainLayout pageTitle="Explore" containerProps={{ pt: '14', pb: '6' }}>
      <SearchInput />
      <StocksList />
    </MainLayout>
  );
}
