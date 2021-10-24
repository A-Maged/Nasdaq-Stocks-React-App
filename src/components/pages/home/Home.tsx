import { Text, Image, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { MainLayout } from 'components/layout/main';

export function Home() {
  return (
    <MainLayout
      wrapperProps={{
        color: 'white',
      }}
      containerProps={{
        maxW: 'container.md',
      }}
    >
      <Center h="85vh" flexDirection="column">
        <Center flexGrow={1} mt={15}>
          <Link to="/explore">
            <Image
              w="64"
              src={process.env.PUBLIC_URL + 'logo-white.png'}
              alt="logo"
            />

            <Text fontSize="md" textAlign="center" mt="4">
              Click to explore stocks
              <ArrowForwardIcon ml="2" />
            </Text>
          </Link>
        </Center>

        <Text fontSize="sm" textAlign="center" pb="3">
          By <br /> Abdelrahman Maged
        </Text>
      </Center>
    </MainLayout>
  );
}
