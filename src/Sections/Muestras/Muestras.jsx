import styles from './Muestras.module.css';
import Cards from '../../Components/Cards/Cards.jsx';

export default function Muestras() {
  return (
    <section id="muestras" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>MUESTRAS</h2>
        <Cards />
      </div>
    </section>
  );
}
