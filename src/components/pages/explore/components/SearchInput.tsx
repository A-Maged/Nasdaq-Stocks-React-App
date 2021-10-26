import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

import { useActions } from 'app';
import { useDebounce } from 'hooks/useDebounce';

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const {
    stocks: { searchStocks },
  } = useActions();

  useEffect(() => {
    searchStocks({ search: debouncedSearchTerm });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

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
        placeholder="Search for stocks"
        name="search-stocks"
        variant="filled"
        color="black"
        bg="white"
        _focus={{ background: 'white' }}
      />
    </InputGroup>
  );
}
