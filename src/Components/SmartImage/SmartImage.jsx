import { useState } from 'react';
import styles from './SmartImage.module.css';

// Sufijos de tamaño de Flickr con su ancho real en píxeles.
// Verificados contra las fotos de data.json: `_h` (1600w) NO existe en ninguna,
// porque Flickr sólo ofrece sufijos hasta el tamaño del original y estas
// fotos son de 1024px. Incluirlo haría que un srcset fuera inservible en
// pantallas de alta densidad. Si se suben fotos más grandes, agregarlo acá.
const FLICKR_SIZES = [
  ['_n', 320],
  ['_z', 640],
  ['_c', 800],
  ['_b', 1024],
];

const SIZE_SUFFIX = /_(?:m|n|z|c|b|h|k)\.(jpe?g|png)$/i;

// Reemplazo por función, no por "$1": si el número de grupos del regex cambia,
// el índice queda desalineado y las URLs salen con un "$1" literal.
function resize(src, suffix) {
  return src.replace(SIZE_SUFFIX, (_, extension) => `${suffix}.${extension}`);
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
  maxWidth = 1024,
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
