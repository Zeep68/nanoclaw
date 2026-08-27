'use client'

import { useEffect, useMemo, useState } from 'react'
import { CATEGORIE_PRIJSNOOT, MENU_DATA, MENU_TABS, type MenuItem, type MenuType } from '@/data/menu'
import styles from './MenuSection.module.css'

const prijsFormat = new Intl.NumberFormat('nl-NL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function isMenuType(value: string): value is MenuType {
  return MENU_TABS.some((tab) => tab.key === value)
}

function groepeer(items: MenuItem[]) {
  const groepen = new Map<string, MenuItem[]>()
  for (const item of items) {
    const bestaand = groepen.get(item.categorie)
    if (bestaand) bestaand.push(item)
    else groepen.set(item.categorie, [item])
  }
  return [...groepen.entries()]
}

export default function MenuSection() {
  const [actief, setActief] = useState<MenuType>('lunch')

  useEffect(() => {
    const uitHash = () => {
      const hash = window.location.hash.slice(1)
      if (isMenuType(hash)) setActief(hash)
    }
    uitHash()
    window.addEventListener('hashchange', uitHash)
    return () => window.removeEventListener('hashchange', uitHash)
  }, [])

  const sectie = MENU_DATA[actief]
  const groepen = useMemo(() => groepeer(sectie.items), [sectie])

  return (
    <section id="menu" className={`section ${styles.menu}`}>
      <div className="wrap">
        {MENU_TABS.map((tab) => (
          <span key={tab.key} id={tab.key} className={styles.anker} aria-hidden="true" />
        ))}

        <div className={styles.tabs} role="tablist" aria-label="Menukaarten">
          {MENU_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={actief === tab.key}
              aria-controls="menu-paneel"
              className={`display ${styles.tab} ${styles[tab.key]} ${
                actief === tab.key ? styles.tabActief : ''
              }`}
              onClick={() => setActief(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          key={actief}
          id="menu-paneel"
          role="tabpanel"
          aria-labelledby={`tab-${actief}`}
          className={styles.paneel}
        >
          <h2 className={`script ${styles.titel} ${styles[`titel_${actief}`]}`}>{sectie.titel}</h2>
          <p className={styles.ondertitel}>{sectie.ondertitel}</p>

          {groepen.map(([categorie, items]) => (
            <div
              key={categorie}
              className={`${styles.groep} ${
                categorie === 'Woodpecker Special' ? styles.speciaal : ''
              }`}
            >
              <h3 className={`display ${styles.categorie}`}>
                {categorie}
                {CATEGORIE_PRIJSNOOT[categorie] && (
                  <span className={styles.prijsnoot}>{CATEGORIE_PRIJSNOOT[categorie]}</span>
                )}
              </h3>

              <ul className={styles.grid}>
                {items.map((item, i) => (
                  <li key={`${categorie}-${item.naam}-${i}`} className={styles.item}>
                    <div className={styles.rij}>
                      <span className={`display ${styles.naam}`}>
                        {item.naam}
                        {item.veg && (
                          <span className={styles.veg} title="Vegetarisch">
                            🌿
                          </span>
                        )}
                        {item.vegOptie && (
                          <span className={styles.vegOptie} title="Optie vegetarisch">
                            🌿
                          </span>
                        )}
                      </span>
                      {item.prijs !== undefined && (
                        <>
                          <span className={styles.stippel} aria-hidden="true" />
                          <span className={styles.prijs}>
                            {prijsFormat.format(item.prijs)}
                            {item.prijsAlt !== undefined &&
                              ` / ${prijsFormat.format(item.prijsAlt)}`}
                          </span>
                        </>
                      )}
                    </div>
                    {item.smaak && <p className={styles.smaak}>{item.smaak}</p>}
                    {item.beschrijving && <p className={styles.beschrijving}>{item.beschrijving}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.legenda}>
          <p>
            <span className={styles.veg}>🌿</span> Vegetarisch &nbsp;·&nbsp;
            <span className={styles.vegOptie}>🌿</span> Optie vegetarisch
          </p>
          <p>
            Heb je allergieën of dieetwensen? Laat het ons weten s.v.p. Alle prijzen in euro&apos;s,
            incl. btw.
          </p>
        </div>
      </div>
    </section>
  )
}
