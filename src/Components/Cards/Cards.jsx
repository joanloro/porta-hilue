import { useState, useEffect } from 'react';
import styles from './Cards.module.css';
import data from '../../../data/data.json';

export default function Cards() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    setProyectos(data.proyectos);
  }, []);

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsGrid}>
        {proyectos.map((proyecto, index) => (
          <CardWithCarousel key={index} proyecto={proyecto} />
        ))}
      </div>
    </div>
  );
}

function CardWithCarousel({ proyecto }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagenes = proyecto.imagenes || [];

  useEffect(() => {
    if (imagenes.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % imagenes.length
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [imagenes.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % imagenes.length
    );
  };

  return (
    <div className={styles.card}>
      {imagenes.length > 0 && (
        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            <img
              src={imagenes[currentImageIndex]}
              alt={`${proyecto.titulo} - ${currentImageIndex + 1}`}
              className={styles.carouselImage}
            />
            {imagenes.length > 1 && (
              <>
                <button
                  className={`${styles.carouselButton} ${styles.prevButton}`}
                  onClick={handlePrevImage}
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button
                  className={`${styles.carouselButton} ${styles.nextButton}`}
                  onClick={handleNextImage}
                  aria-label="Imagen siguiente"
                >
                  ›
                </button>
              </>
            )}
          </div>
          {imagenes.length > 1 && (
            <div className={styles.carouselIndicators}>
              {imagenes.map((_, idx) => (
                <span
                  key={idx}
                  className={`${styles.indicator} ${idx === currentImageIndex ? styles.activeIndicator : ''
                    }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{proyecto.titulo}</h3>
        <div className={styles.cardSeparator} >
          {proyecto.tipo && (
            <p className={styles.cardInfo}>
               {proyecto.tipo}
            </p>
          )}

          <p className={styles.cardInfo}>
             {proyecto.lugar}
          </p>

          {proyecto.colectivo && (
            <p className={styles.cardInfo}>
               {proyecto.colectivo}
            </p>
          )}

          {proyecto.institucion && (
            <p className={styles.cardInfo}>
              {proyecto.institucion}
            </p>
          )}

          <p className={styles.cardInfo}>
            {proyecto.duracion}
          </p>

          {proyecto.direccion && (
            <p className={styles.cardInfo}>
              {proyecto.direccion}
            </p>
          )}

          {proyecto.fotografo && (
            <p className={styles.cardInfo}>
              {proyecto.fotografo}
            </p>
          )}

          {proyecto.fecha && (
            <p className={styles.cardDate}>{proyecto.fecha}</p>
          )}
        </div>
      </div>
    </div>
  );
}