import { useState, useEffect } from 'react';
import styles from './AboutMe.module.css';
import data from '../../../data/data.json';

export default function AboutMe() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setInfo(data);
  }, []);

  if (!info) return null;

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <img src="https://live.staticflickr.com/65535/54907422320_793ba1d7ca_b.jpg" width="683" height="1024" alt="17082025-IMG_5661"/>
        <div className={styles.content}>
          <div className={styles.bioSection}>
            <h3 className={styles.subtitle}>Sobre mí</h3>
            <p className={styles.bio}>{info.bio}</p>
          </div>

          <div className={styles.manifiestoSection}>
            <h3 className={styles.subtitle}>Mi Manifiesto</h3>
            <p className={styles.manifiesto}>{info.manifiesto}</p>
          </div>
        </div>
      </div>
    </section>
  );
}