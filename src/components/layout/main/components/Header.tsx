import { Box, Spacer, Image, Menu } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { MenuItem } from './MenuItem';

export function Header() {
  return (
    <Box
      as="header"
      d="flex"
      alignItems="center"
      px="4"
      bg="white"
      color="black"
    >
      <Link to="/">
        <Image h="30" src="/Logo.svg" />
      </Link>
      <Spacer />

      <Menu>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/explore">Explore</MenuItem>
      </Menu>
    </Box>
  );
}
