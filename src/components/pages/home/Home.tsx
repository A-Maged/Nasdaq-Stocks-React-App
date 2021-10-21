import { Text, Image, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { MainLayout } from 'components/layout/main';

export function Home() {
  return (
    <MainLayout
      wrapperProps={{
        color: 'white',
        minH: '100vh',
      }}
      containerProps={{
        maxW: 'container.md',
      }}
    >
      <Center h="100vh">
        <Link to="/explore">
          <Image
            w="64"
            src={process.env.PUBLIC_URL + 'logo-white.png'}
            alt="logo"
          />

          <Text fontSize="sm" textAlign="center" mt="2">
            Click to explore stocks
            <ArrowForwardIcon ml="2" />
          </Text>
        </Link>
      </Center>
    </MainLayout>
  );
}
