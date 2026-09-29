import styles from './Contacto.module.css';
import { Instagram, Music2, PhoneCall, MailCheck } from 'lucide-react';
import data from '../../../data/data.json';

const ICONS = {
  email: MailCheck,
  telefono: PhoneCall,
  instagram: Instagram,
  tiktok: Music2,
};

const LABELS = {
  email: 'Email',
  telefono: 'Teléfono',
  instagram: 'Instagram',
  tiktok: 'TikTok',
};

function buildHref(tipo, valor) {
  switch (tipo) {
    case 'email':
      return `mailto:${valor}`;
    case 'telefono':
      return `tel:${valor.replace(/\s+/g, '')}`;
    case 'instagram':
      return `https://instagram.com/${valor}`;
    case 'tiktok':
      return `https://tiktok.com/${valor}`;
    default:
      return '#';
  }
}

export default function Contacto() {
  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>CONTÁCTAME</h2>
        <p className={styles.subtitle}>¿Tienes un proyecto en mente? ¡Hablemos!</p>

        <ul className={styles.contactGrid}>
          {Object.entries(data.contacto).map(([tipo, valor]) => {
            const Icono = ICONS[tipo];
            const externo = tipo === 'instagram' || tipo === 'tiktok';

            return (
              <li key={tipo}>
                <a
                  href={buildHref(tipo, valor)}
                  className={styles.contactCard}
                  {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.icon} aria-hidden="true">
                    <Icono />
                  </span>
                  <h3 className={styles.contactTitle}>{LABELS[tipo]}</h3>
                  <p className={styles.contactInfo}>{valor}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
