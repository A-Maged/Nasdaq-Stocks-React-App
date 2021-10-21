import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider>
        <div>app</div>
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
