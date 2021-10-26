import { HStack, Link, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ImageWithAvatarFallback } from 'components/shared/ImageWithFallback';
import { useAppState } from 'app';

export function Header() {
  const { ticker } = useParams<{ ticker: string }>();
  const { details } = useAppState((state) => state.stocks.currentStock);

  const { name, logo, url } = details.data || {};
  const urlPrefix = String(url).startsWith('http') ? '' : '//';

  return (
    <HStack spacing="6">
      <ImageWithAvatarFallback
        src={logo}
        name={name}
        imageProps={{
          w: '28',
        }}
      />

      <VStack spacing="1" alignItems="flex-start">
        <Text fontWeight="bold">{ticker}</Text>
        <Text>{name}</Text>
        {url && (
          <Link
            href={urlPrefix + url}
            isExternal
            color="blue"
            fontWeight="bold"
          >
            View website
          </Link>
        )}
      </VStack>
    </HStack>
  );
}
