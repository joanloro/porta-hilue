import { useState, useEffect } from 'react';
import styles from './home.module.css';
import data from '../../../data/data.json';

export default function Home() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setInfo(data);
  }, []);

  if (!info) return null;

  return (
    <section id="welcome" className={styles.section}>
        <img className={styles.fotoFondo} src="https://live.staticflickr.com/65535/54907108966_9d3a7397d1_b.jpg"  alt="17082025-IMG_5754"/>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.nombre}>{info.nombre}</h1>
          <h2 className={styles.subtitulo}>{info.subtitulo}</h2>
          <h2 className={styles.rol}>{info.rol}</h2>
        </div>
      </div>
    </section>
  );
}