import { Image, Center } from '@chakra-ui/react';

import { MainLayout } from 'components/layout/main';

export function Home() {
  return (
    <MainLayout
      wrapperProps={{
        bg: 'twitter.500',
        color: 'white',
        minH: '100vh',
      }}
      containerProps={{
        maxW: 'container.md',
      }}
    >
      <Center h="100vh">
        <Image
          w="64"
          src={process.env.PUBLIC_URL + 'logo-white.png'}
          alt="logo"
        />
      </Center>
    </MainLayout>
  );
}
