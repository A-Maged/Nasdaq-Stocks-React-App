import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './routes';

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider>
        <Router>
          <Routes />
        </Router>
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
