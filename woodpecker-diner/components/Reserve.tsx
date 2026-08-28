'use client'

import { useState } from 'react'
import { RESERVERING_TIJDEN, SITE } from '@/data/site'
import styles from './Reserve.module.css'

type Status = 'idle' | 'versturen' | 'gelukt' | 'mail' | 'mislukt'

// Optioneel endpoint (bijvoorbeeld een Odoo-webhook). Staat die er niet, dan
// opent het formulier een vooringevulde mail.
const WEBHOOK = process.env.NEXT_PUBLIC_RESERVATIONS_WEBHOOK_URL

const LEEG = {
  date: '',
  time: '19:00',
  guests: '2',
  name: '',
  email: '',
  phone: '',
  note: '',
}

function mailtoLink(velden: typeof LEEG) {
  const body = [
    `Datum: ${velden.date}`,
    `Tijd: ${velden.time}`,
    `Aantal personen: ${velden.guests}`,
    `Naam: ${velden.name}`,
    `E-mail: ${velden.email}`,
    `Telefoon: ${velden.phone}`,
    `Opmerking: ${velden.note || '-'}`,
  ].join('\n')

  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Reservering ${velden.date} ${velden.time} (${velden.guests} p.)`,
  )}&body=${encodeURIComponent(body)}`
}

export default function Reserve() {
  const [velden, setVelden] = useState(LEEG)
  const [status, setStatus] = useState<Status>('idle')

  const vandaag = new Date().toISOString().slice(0, 10)

  function update(key: keyof typeof LEEG) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setVelden((v) => ({ ...v, [key]: e.target.value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!WEBHOOK) {
      window.location.href = mailtoLink(velden)
      setStatus('mail')
      return
    }

    setStatus('versturen')

    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(velden),
    }).catch(() => null)

    if (res?.ok) {
      setStatus('gelukt')
      setVelden(LEEG)
    } else {
      setStatus('mislukt')
    }
  }

  return (
    <section id="reserveren" className={`section ${styles.reserve}`}>
      <div className="wrap">
        <p className="kicker">Reserveren</p>
        <h2 className={`script ${styles.titel}`}>Reserveer een tafel</h2>

        <div className={styles.layout}>
          <form className={`card ${styles.form}`} onSubmit={onSubmit}>
            <div className={styles.veld}>
              <label htmlFor="date">Datum</label>
              <input
                id="date"
                type="date"
                required
                min={vandaag}
                value={velden.date}
                onChange={update('date')}
              />
            </div>

            <div className={styles.veld}>
              <label htmlFor="time">Tijd</label>
              <select id="time" required value={velden.time} onChange={update('time')}>
                {RESERVERING_TIJDEN.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.veld}>
              <label htmlFor="guests">Aantal personen</label>
              <select id="guests" required value={velden.guests} onChange={update('guests')}>
                {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.veld}>
              <label htmlFor="name">Naam</label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={velden.name}
                onChange={update('name')}
              />
            </div>

            <div className={styles.veld}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={velden.email}
                onChange={update('email')}
              />
            </div>

            <div className={styles.veld}>
              <label htmlFor="phone">Telefoon</label>
              <input
                id="phone"
                type="tel"
                required
                autoComplete="tel"
                value={velden.phone}
                onChange={update('phone')}
              />
            </div>

            <div className={`${styles.veld} ${styles.breed}`}>
              <label htmlFor="note">Opmerking (optioneel)</label>
              <textarea
                id="note"
                rows={3}
                placeholder="Allergieën, gelegenheid, voorkeur voor een tafel…"
                value={velden.note}
                onChange={update('note')}
              />
            </div>

            <button
              type="submit"
              className={`btn primary ${styles.breed}`}
              disabled={status === 'versturen'}
            >
              {status === 'versturen' ? 'Versturen…' : 'Verstuur aanvraag'}
            </button>

            <p className={`${styles.breed} ${styles.klein}`} role="status" aria-live="polite">
              {status === 'gelukt' && (
                <span className={styles.gelukt}>
                  Bedankt! We hebben je aanvraag ontvangen en bevestigen je tafel zo snel mogelijk
                  per mail.
                </span>
              )}
              {status === 'mail' && (
                <span className={styles.gelukt}>
                  Je mailprogramma is geopend met je aanvraag erin — verstuur die mail, dan
                  bevestigen we je tafel zo snel mogelijk. Gebeurde er niets?{' '}
                  <a href={mailtoLink(velden)}>Open de mail opnieuw</a> of bel{' '}
                  <a href={SITE.telefoonLink}>{SITE.telefoon}</a>.
                </span>
              )}
              {status === 'mislukt' && (
                <span className={styles.mislukt}>
                  Het versturen lukte even niet.{' '}
                  <a href={mailtoLink(velden)}>Mail je aanvraag rechtstreeks</a> of bel ons op{' '}
                  <a href={SITE.telefoonLink}>{SITE.telefoon}</a>.
                </span>
              )}
              {(status === 'idle' || status === 'versturen') &&
                'Een aanvraag is nog geen bevestiging — je krijgt van ons bericht.'}
            </p>
          </form>

          <aside className={`card ${styles.contact}`}>
            <h3 className={`display ${styles.contactTitel}`}>Bezoek ons</h3>

            <address className={styles.adres}>
              {SITE.adres.straat}
              <br />
              {SITE.adres.postcode} {SITE.adres.plaats}
            </address>

            <p className={styles.regel}>
              <a href={SITE.telefoonLink}>{SITE.telefoon}</a>
            </p>
            <p className={styles.regel}>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>

            <h3 className={`display ${styles.contactTitel}`}>Openingstijden</h3>
            <ul className={styles.tijden}>
              {SITE.openingstijden.map((rij) => (
                <li key={rij.dagen}>
                  <span>{rij.dagen}</span>
                  <span>{rij.tijden}</span>
                </li>
              ))}
            </ul>

            <p className={styles.klein}>
              Grote groepen (8+) of een privédiner? Bel ons even, dan regelen we het samen.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
