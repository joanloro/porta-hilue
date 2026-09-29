import styles from './Portada.module.css';
import SmartImage from '../../Components/SmartImage/SmartImage.jsx';
import data from '../../../data/data.json';

export default function Portada() {
  return (
    <section id="welcome" className={styles.section}>
      <SmartImage
        src="https://live.staticflickr.com/65535/54907108966_9d3a7397d1_b.jpg"
        alt="Hilue Zuñiga en escena"
        sizes="100vw"
        priority
        maxWidth={1024}
        className={styles.fotoFondo}
      />
      <div className={styles.container}>
        <h1 className={styles.nombre}>{data.nombre}</h1>
        <p className={styles.subtitulo}>{data.subtitulo}</p>
        <p className={styles.rol}>{data.rol}</p>
      </div>
    </section>
  );
}
