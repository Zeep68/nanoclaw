import styles from './About.module.css'

export default function About() {
  return (
    <section id="over-ons" className={`section ${styles.about}`}>
      <div className="wrap">
        <p className={`kicker ${styles.kicker}`}>Over ons</p>
        <h2 className={`script ${styles.titel}`}>About The Woodpecker Diner</h2>

        <div className={styles.copy}>
          <p>
            The Woodpecker Diner opende in 2024 in Dordrecht met één idee: de warmte van een
            Amerikaanse diner combineren met het vuur van houtskool. Geen strak wit tafellinnen, wel
            grote borden, koude cocktails en muziek die net iets te hard staat.
          </p>
          <p>
            Alles draait om het vuur in onze keuken. Pastrami die dagen krijgt, een half gebraden
            eend, een T-bone van een kilo om te delen — en net zo goed een risotto van pruikzwam en
            maitake voor wie het vlees laat staan.
          </p>
        </div>

        <p className={`display ${styles.josper}`}>
          Crafted in our Josper oven — charcoal-grilled to perfection
        </p>

        <ul className={styles.pijlers}>
          <li>
            <span className={`display ${styles.pijlerTitel}`}>Houtskool</span>
            <span className={styles.pijlerTekst}>
              Josper-oven op 350°C — rook en korst die je op gas niet krijgt
            </span>
          </li>
          <li>
            <span className={`display ${styles.pijlerTitel}`}>Southern</span>
            <span className={styles.pijlerTekst}>
              Nashville fried chicken, pastrami, sweetbread and waffles
            </span>
          </li>
          <li>
            <span className={`display ${styles.pijlerTitel}`}>Dordrecht</span>
            <span className={styles.pijlerTekst}>
              Lokale kazen en leveranciers, van Olde Remeker tot Oudwijker
            </span>
          </li>
        </ul>
      </div>
    </section>
  )
}
