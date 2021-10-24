import { Avatar, Image, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

export function ImageWithFallback({
  src,
  name,
}: {
  src?: string;
  name?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src && !name) {
    return <></>;
  }

  let fallback = <></>;

  if (loading) {
    fallback = <Spinner />;
  } else if (error && name) {
    fallback = <Avatar name={name} boxSize="20" borderRadius="0" />;
  }

  return (
    <Image
      src={src}
      fallback={fallback}
      onLoad={() => {
        setLoading(false);
      }}
      onError={() => {
        setError(true);
        setLoading(false);
      }}
    />
  );
}
