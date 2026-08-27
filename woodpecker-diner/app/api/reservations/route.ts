import { NextResponse } from 'next/server'

const VERPLICHT = ['date', 'time', 'guests', 'name', 'email', 'phone'] as const

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || VERPLICHT.some((veld) => !String(body[veld] ?? '').trim())) {
    return NextResponse.json(
      { success: false, message: 'Vul alle verplichte velden in.' },
      { status: 400 },
    )
  }

  const reservering = {
    date: String(body.date),
    time: String(body.time),
    guests: Number(body.guests),
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone),
    note: String(body.note ?? ''),
  }

  // Zonder webhook (bijv. de Odoo-endpoint) loggen we de aanvraag alleen; het
  // formulier valt in de browser terug op mailto zodra dit een fout teruggeeft.
  const webhook = process.env.RESERVATIONS_WEBHOOK_URL
  if (webhook) {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.RESERVATIONS_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.RESERVATIONS_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(reservering),
    }).catch(() => null)

    if (!res?.ok) {
      console.error('Reservering kon niet worden doorgestuurd', reservering)
      return NextResponse.json(
        { success: false, message: 'De reservering kon niet worden verwerkt.' },
        { status: 502 },
      )
    }
  } else {
    console.info('Reservering ontvangen', reservering)
  }

  return NextResponse.json({ success: true, message: 'Reservation confirmed' })
}
