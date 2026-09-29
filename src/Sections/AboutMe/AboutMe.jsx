import styles from './AboutMe.module.css';
import SmartImage from '../../Components/SmartImage/SmartImage.jsx';
import data from '../../../data/data.json';

export default function AboutMe() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <SmartImage
          src="https://live.staticflickr.com/65535/54907422320_793ba1d7ca_b.jpg"
          alt="Retrato de Hilue Zuñiga"
          sizes="(max-width: 1024px) 100vw, 40vw"
          maxWidth={1024}
          className={styles.retrato}
        />
        <div className={styles.content}>
          <div className={styles.bloque}>
            <h2 className={styles.subtitle}>Sobre mí</h2>
            <p className={styles.bio}>{data.bio}</p>
          </div>
          <div className={styles.bloque}>
            <h2 className={styles.subtitle}>Mi manifiesto</h2>
            <p className={styles.manifiesto}>{data.manifiesto}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
