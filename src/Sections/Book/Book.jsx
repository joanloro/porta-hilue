import { useState, useEffect } from 'react';
import styles from './Book.module.css';
import data from '../../../data/data.json';

export default function Book() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    if (data.fotos) {
      setFotos(data.fotos);
    }
  }, []);

  return (
    <section id="book" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>MI GALERÍA</h2>
        <div className={styles.gallery}>
          {fotos.map((foto, index) => (
            <div key={index} className={styles.galleryItem}>
              <img 
                src={foto} 
                alt={`Foto ${index + 1}`}
                className={styles.galleryImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}