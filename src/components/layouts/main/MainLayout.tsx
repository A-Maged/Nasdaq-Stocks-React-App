import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, BoxProps, Container, ContainerProps } from '@chakra-ui/react';

import { Header } from './components/Header';

type Props = PropsWithChildren<{
  pageTitle?: string;
  containerProps?: ContainerProps;
  wrapperProps?: BoxProps;
}>;

export function MainLayout({
  children,
  pageTitle,
  containerProps = {},
  wrapperProps = {},
}: Props) {
  const title = pageTitle ? pageTitle + ' | Nasdaq' : 'Nasdaq';

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <Box bg="twitter.500" minH="100vh" {...wrapperProps}>
        <Header />

        <Container
          maxW="6xl"
          as="main"
          d="flex"
          flexDirection="column"
          flexGrow={1}
          {...containerProps}
        >
          {children}
        </Container>
      </Box>
    </>
  );
}
