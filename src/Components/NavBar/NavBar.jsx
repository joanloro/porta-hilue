import { useEffect, useState } from 'react';
import styles from './NavBar.module.css';
import { Menu, X } from 'lucide-react';
import logo from '../../../data/logo.png';

const LABELS = {
  welcome: 'Bienvenida',
  about: 'Sobre mí',
  muestras: 'Muestras',
  book: 'Fotos',
  contacto: 'Contacto',
};

export default function NavBar() {
  const [enlaces, setEnlaces] = useState([]);
  const [activa, setActiva] = useState('about');
  const [abierto, setAbierto] = useState(false);

  // Los enlaces se derivan del orden real del DOM para que nunca se desincronicen.
  useEffect(() => {
    const secciones = [...document.querySelectorAll('main section[id]')].filter(
      (seccion) => LABELS[seccion.id]
    );

    setEnlaces(secciones.map(({ id }) => ({ id, label: LABELS[id] })));
  }, []);

  // Scroll spy con IntersectionObserver: sin listeners de scroll ni throttling.
  useEffect(() => {
    const secciones = [...document.querySelectorAll('main section[id]')].filter(
      (seccion) => LABELS[seccion.id]
    );

    const navHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 80;

    const visibles = new Set();

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) visibles.add(target.id);
          else visibles.delete(target.id);
        });

        // La activa es la primera visible en orden de documento.
        const actual = secciones.find((seccion) => visibles.has(seccion.id));
        if (actual) setActiva(actual.id);
      },
      {
        rootMargin: `-${navHeight}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    secciones.forEach((seccion) => observer.observe(seccion));
    return () => observer.disconnect();
  }, []);

  // Cerrar el menú al cambiar a ancho escritorio.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)');
    const onChange = (event) => {
      if (event.matches) setAbierto(false);
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Cerrar con Escape.
  useEffect(() => {
    if (!abierto) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setAbierto(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [abierto]);

  const irA = (id) => {
    setActiva(id);
    setAbierto(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegación principal">
        <img src={logo} alt="Hilue Zuñiga" className={styles.logo} />

        <ul className={styles.navList}>
          {enlaces.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${styles.navLink} ${activa === id ? styles.active : ''}`}
                aria-current={activa === id ? 'true' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setAbierto((prev) => !prev)}
          aria-expanded={abierto}
          aria-controls="nav-menu"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          {abierto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <div id="nav-menu" className={`${styles.panel} ${abierto ? styles.panelOpen : ''}`}>
        <ul className={styles.panelList}>
          {enlaces.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${styles.navLink} ${activa === id ? styles.active : ''}`}
                aria-current={activa === id ? 'true' : undefined}
                onClick={() => irA(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
