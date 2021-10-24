import { Text, TextProps, StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { urlsMatch } from 'utils';

interface Props extends TextProps {
  children: ReactNode;
  to: string;
  textProps?: TextProps;
}

export function MenuItem({ children, to, ...textProps }: Props) {
  const { pathname } = useLocation();
  const isActive = urlsMatch(to, pathname);
  const activeStyle: StyleProps = isActive
    ? {
        color: 'white',
        bg: 'blue.400',
      }
    : {};

  return (
    <Link to={to}>
      <Text
        display="block"
        py="3.5"
        px="6"
        _hover={{
          color: 'white',
          bg: 'twitter.400',
          textDecoration: 'none',
        }}
        {...activeStyle}
        {...textProps}
      >
        {children}
      </Text>
    </Link>
  );
}
