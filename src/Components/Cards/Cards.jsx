import { useEffect, useRef, useState } from 'react';
import styles from './Cards.module.css';
import SmartImage from '../SmartImage/SmartImage.jsx';
import data from '../../../data/data.json';

const CAMPOS = [
  ['tipo', 'Tipo'],
  ['lugar', 'Lugar'],
  ['colectivo', 'Colectivo'],
  ['institucion', 'Institución'],
  ['duracion', 'Duración'],
  ['direccion', 'Dirección'],
  ['fotografo', 'Fotografía'],
];

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 50;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReduced(event.matches);

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export default function Cards() {
  return (
    <ul className={styles.cardsGrid}>
      {data.proyectos.map((proyecto) => (
        <li key={proyecto.titulo}>
          <CardWithCarousel proyecto={proyecto} />
        </li>
      ))}
    </ul>
  );
}

function CardWithCarousel({ proyecto }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef(null);

  const imagenes = proyecto.imagenes ?? [];
  const total = imagenes.length;
  const tieneVarias = total > 1;

  useEffect(() => {
    if (total < 2 || paused || reducedMotion) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [total, paused, reducedMotion]);

  const goTo = (index) => setCurrent((index + total) % total);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(current + 1);
    }
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      goTo(delta > 0 ? current - 1 : current + 1);
    }
  };

  return (
    <article
      className={styles.card}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {total > 0 && (
        <div
          className={styles.carousel}
          role="group"
          aria-roledescription="carrusel"
          aria-label={`Imágenes de ${proyecto.titulo}`}
          tabIndex={tieneVarias ? 0 : -1}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <SmartImage
            src={imagenes[current]}
            alt={`${proyecto.titulo}, imagen ${current + 1} de ${total}`}
            sizes="(max-width: 480px) 100vw, (max-width: 900px) 90vw, 400px"
            maxWidth={1024}
            className={styles.carouselImage}
          />

          {tieneVarias && (
            <>
              <button
                type="button"
                className={`${styles.carouselButton} ${styles.prevButton}`}
                onClick={() => goTo(current - 1)}
                aria-label="Imagen anterior"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                className={`${styles.carouselButton} ${styles.nextButton}`}
                onClick={() => goTo(current + 1)}
                aria-label="Imagen siguiente"
              >
                <span aria-hidden="true">›</span>
              </button>

              <div className={styles.carouselIndicators}>
                {imagenes.map((imagen, idx) => (
                  <button
                    key={imagen}
                    type="button"
                    className={`${styles.indicator} ${idx === current ? styles.activeIndicator : ''}`}
                    onClick={() => goTo(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    aria-current={idx === current}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{proyecto.titulo}</h3>

        <ul className={styles.datos}>
          {CAMPOS.map(([campo, etiqueta]) =>
            proyecto[campo] ? (
              <li key={campo} className={styles.dato}>
                <span className={styles.datoLabel}>{etiqueta}:</span>{' '}
                {proyecto[campo]}
              </li>
            ) : null
          )}
        </ul>

        {proyecto.fecha && <p className={styles.cardDate}>{proyecto.fecha}</p>}
      </div>
    </article>
  );
}
