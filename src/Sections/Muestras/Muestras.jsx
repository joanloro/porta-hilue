import Cards from '../../Components/Cards/Cards.jsx';
import styles from './Muestras.module.css';

export default function Muestras() {
  return (
    <section id="muestras" className={styles.section}>
      <h2 className={styles.title}>MUESTRAS</h2>
      <Cards />
    </section>
  );
}