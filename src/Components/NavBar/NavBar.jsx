import { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import logo from '../../../data/logo.png';

export default function NavBar() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['welcome', 'about', 'book', 'muestras', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar inmediatamente para establecer la sección inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={styles.nav}>
      <img src={logo} alt="Logo Hilue" className={styles.logo} />
      <ul className={styles.navList}>
         <li>
          <a 
            href="#welcome" 
            className={`${styles.navLink} ${activeSection === 'welcome' ? styles.active : ''}`}
          >
            BIENVENIDA
          </a>
        </li>
        <li>
          <a 
            href="#about" 
            className={`${styles.navLink} ${activeSection === 'about' ? styles.active : ''}`}
          >
            SOBRE MI
          </a>
        </li>
        <li>
          <a 
            href="#muestras" 
            className={`${styles.navLink} ${activeSection === 'muestras' ? styles.active : ''}`}
          >
            MUESTRAS
          </a>
        </li>
        <li>
          <a 
            href="#book" 
            className={`${styles.navLink} ${activeSection === 'book' ? styles.active : ''}`}
          >
            FOTOS
          </a>
        </li>
        <li>
          <a 
            href="#contacto" 
            className={`${styles.navLink} ${activeSection === 'contacto' ? styles.active : ''}`}
          >
            CONTACTO
          </a>
        </li>
      </ul>
    </nav>
  );
}