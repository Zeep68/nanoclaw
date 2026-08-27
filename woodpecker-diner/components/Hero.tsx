import Bird from './Bird'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className="wrap">
        <p className="kicker">Southern American · Since 2024</p>

        <h1 className={`script ${styles.headline}`}>The Woodpecker</h1>
        <p className={`display ${styles.sub}`}>D · I · N · E · R</p>

        <p className={styles.tagline}>
          Southern comfort food uit Dordrecht — gegrild en gerookt op de{' '}
          <strong className={styles.josper}>Josper</strong> houtskooloven. Van pastrami tot half
          gebraden eend, met cocktails die kloppen.
        </p>

        <div className={styles.actions}>
          <a href="#menu" className="btn primary">
            Bekijk het menu
          </a>
          <a href="#reserveren" className="btn ghost">
            Reserveer een tafel
          </a>
        </div>

        <div className={styles.bird}>
          <Bird />
        </div>
      </div>
    </section>
  )
}
