import styles from './Book.module.css';
import SmartImage from '../../Components/SmartImage/SmartImage.jsx';
import data from '../../../data/data.json';

export default function Book() {
  return (
    <section id="book" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>MI GALERÍA</h2>
        <ul className={styles.gallery}>
          {data.fotos.map((foto, index) => (
            <li key={foto} className={styles.galleryItem}>
              <SmartImage
                src={foto}
                alt={`Foto ${index + 1} de la galería`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                maxWidth={1024}
                className={styles.galleryImage}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
