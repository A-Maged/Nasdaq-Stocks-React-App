import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useContextSelector } from 'use-context-selector';

import { pageContext } from '../state';

export function SearchInput() {
  const setSearchTerm = useContextSelector(
    pageContext,
    (v) => v?.setSearchTerm!
  );

  return (
    <InputGroup mb="14" maxW="md" mx="auto">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search"
        variant="filled"
        color="black"
        bg="white"
        _focus={{ background: 'white' }}
      />
    </InputGroup>
  );
}
