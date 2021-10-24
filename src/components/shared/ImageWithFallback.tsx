import { Avatar, Image, Spinner, ImageProps } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  src?: string;
  name?: string;
  imageProps?: ImageProps;
};

export function ImageWithAvatarFallback({ src, name, imageProps = {} }: Props) {
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
      {...imageProps}
    />
  );
}
