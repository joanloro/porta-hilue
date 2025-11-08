import { useState, useEffect } from 'react';
import styles from './Contacto.module.css';
import data from '../../../data/data.json';
import { Instagram } from 'lucide-react';
import { Music2 } from 'lucide-react';
import { PhoneCall } from 'lucide-react';
import { MailCheck } from 'lucide-react';

export default function Contacto() {
  const [contacto, setContacto] = useState(null);

  useEffect(() => {
    if (data.contacto) {
      setContacto(data.contacto);
    }
  }, []);

  if (!contacto) return null;

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>CONTÁCTAME</h2>
        <p className={styles.subtitle}>¿Tienes un proyecto en mente? ¡Hablemos!</p>

        <div className={styles.contactGrid}>
          <a href={`mailto:${contacto.email}`} className={styles.contactCard}>
            <div className={styles.icon}><MailCheck /></div>
            <h3 className={styles.contactTitle}>Email</h3>
            <p className={styles.contactInfo}>{contacto.email}</p>
          </a>

          <a href={`tel:${contacto.telefono}`} className={styles.contactCard}>
            <div className={styles.icon}><PhoneCall /></div>
            <h3 className={styles.contactTitle}>Teléfono</h3>
            <p className={styles.contactInfo}>{contacto.telefono}</p>
          </a>

          <a 
            href={`https://instagram.com/${contacto.instagram}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.contactCard}
          >
            <div className={styles.icon}><Instagram /></div>
            <h3 className={styles.contactTitle}>Instagram</h3>
            <p className={styles.contactInfo}>{contacto.instagram}</p>
          </a>

          <a 
            href={`https://tiktok.com/${contacto.tiktok}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.contactCard}
          >
            <div className={styles.icon}><Music2 /></div>
            <h3 className={styles.contactTitle}>TikTok</h3>
            <p className={styles.contactInfo}>{contacto.tiktok}</p>
          </a>
        </div>
      </div>
    </section>
  );
}