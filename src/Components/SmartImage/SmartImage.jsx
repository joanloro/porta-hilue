import { useState } from 'react';
import styles from './SmartImage.module.css';

// Sufijos de tamaño de Flickr con su ancho real en píxeles.
const FLICKR_SIZES = [
  ['_n', 320],
  ['_z', 640],
  ['_c', 800],
  ['_b', 1024],
  ['_h', 1600],
];

const SIZE_SUFFIX = /_(?:m|n|z|c|b|h|k)\.(jpe?g|png)$/i;

function resize(src, suffix) {
  return src.replace(SIZE_SUFFIX, `${suffix}.$2`);
}

function buildSrcset(src, maxWidth) {
  if (!SIZE_SUFFIX.test(src)) return undefined;

  return FLICKR_SIZES.filter(([, width]) => width <= maxWidth)
    .map(([suffix, width]) => `${resize(src, suffix)} ${width}w`)
    .join(', ');
}

export default function SmartImage({
  src,
  alt,
  sizes = '100vw',
  className = '',
  priority = false,
  maxWidth = 1600,
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`${styles.fallback} ${className}`} role="img" aria-label={alt} />;
  }

  return (
    <img
      src={src}
      srcSet={buildSrcset(src, maxWidth)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
