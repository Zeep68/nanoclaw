import { SITE } from '@/data/site'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className={`script ${styles.merk}`}>The Woodpecker</p>
          <p className={`display ${styles.merkSub}`}>Diner · Dordrecht</p>
          <p className={styles.tagline}>{SITE.tagline}</p>

          <div className={styles.social}>
            <a href={SITE.instagram} aria-label="Instagram" rel="noreferrer noopener" target="_blank">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={SITE.facebook} aria-label="Facebook" rel="noreferrer noopener" target="_blank">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.29-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.43-3.96 4.07V9.9H7.65V13h2.72v8h3.13Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Menu">
          <h2 className={`display ${styles.kop}`}>Menu</h2>
          <ul className={styles.lijst}>
            <li>
              <a href="#lunch">Lunch</a>
            </li>
            <li>
              <a href="#diner">Diner</a>
            </li>
            <li>
              <a href="#drinks">Drinks</a>
            </li>
            <li>
              <a href="#over-ons">Over ons</a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={`display ${styles.kop}`}>Contact</h2>
          <ul className={styles.lijst}>
            <li>
              {SITE.adres.straat}, {SITE.adres.postcode} {SITE.adres.plaats}
            </li>
            <li>
              <a href={SITE.telefoonLink}>{SITE.telefoon}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href="#reserveren">Reserveer een tafel</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`wrap ${styles.copy}`}>
        © {new Date().getFullYear()} {SITE.naam} · {SITE.stad} — Alle prijzen in euro&apos;s, incl.
        btw.
      </div>
    </footer>
  )
}
