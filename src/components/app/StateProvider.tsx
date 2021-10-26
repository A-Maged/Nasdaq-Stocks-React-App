import { createOvermind } from 'overmind';
import { Provider as OvermindProvider } from 'overmind-react';
import { ReactNode } from 'react';

import { config } from 'app';

const overmind = createOvermind(config, {
  devtools: '127.0.0.1:3031',
});

type Props = {
  children: ReactNode;
  contextValue?: any;
};

export function StateProvider({ children, contextValue }: Props) {
  return (
    <OvermindProvider value={contextValue || overmind}>
      {children}
    </OvermindProvider>
  );
}
