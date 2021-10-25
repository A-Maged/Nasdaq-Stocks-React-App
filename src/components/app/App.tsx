import { Routes } from './Routes';
import { GlobalProviders } from './GlobalProviders';

export function App() {
  return (
    <GlobalProviders>
      <Routes />
    </GlobalProviders>
  );
}
