import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Flex,
  Box,
  BoxProps,
  Container,
  ContainerProps,
} from '@chakra-ui/react';

type MainLayoutProps = PropsWithChildren<{
  pageTitle?: string;
  containerProps?: ContainerProps;
  wrapperProps?: BoxProps;
}>;

export function MainLayout({
  children,
  pageTitle,
  containerProps = {},
  wrapperProps = {},
}: MainLayoutProps) {
  const title = pageTitle ? pageTitle + ' | Nasdaq' : 'Nasdaq';

  return (
    <Flex direction="column" minH="100vh">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <Box {...wrapperProps}>
        <Container
          maxW="8xl"
          as="main"
          d="flex"
          flexDirection="column"
          flexGrow={1}
          {...containerProps}
        >
          {children}
        </Container>
      </Box>
    </Flex>
  );
}
