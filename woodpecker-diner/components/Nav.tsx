'use client'

import { useState } from 'react'
import styles from './Nav.module.css'

const LINKS = [
  { href: '#lunch', label: 'Lunch' },
  { href: '#diner', label: 'Diner' },
  { href: '#drinks', label: 'Drinks' },
  { href: '#over-ons', label: 'Over ons' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={`script ${styles.brandName}`}>The Woodpecker</span>
          <span className={`display ${styles.brandSub}`}>Diner · Dordrecht</span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="hoofdmenu"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <nav
          id="hoofdmenu"
          className={`${styles.links} ${open ? styles.linksOpen : ''}`}
          aria-label="Hoofdnavigatie"
        >
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="display" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="#reserveren"
            className={`btn primary ${styles.cta}`}
            onClick={() => setOpen(false)}
          >
            Reserveren
          </a>
        </nav>
      </div>
    </header>
  )
}
