# The Woodpecker Diner — website

Next.js 15 (App Router) site voor The Woodpecker Diner in Dordrecht.

## Draaien

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # statische export naar out/
npm run preview   # serveert out/ lokaal
npm run lint
npm run typecheck
```

## Structuur

| Pad | Doel |
|-----|------|
| `app/layout.tsx` | Fonts (Bebas Neue, Pacifico, Poppins via `next/font`), metadata |
| `app/page.tsx` | Pagina-opbouw + JSON-LD `Restaurant` |
| `app/globals.css` | Kleurvariabelen, knoppen, checkerboard-divider, formuliervelden |
| `components/` | Nav, Hero, MenuSection, About, Reserve, Footer, Bird |
| `data/menu.ts` | Volledige lunch-, diner- en drinkskaart |
| `data/site.ts` | Adres, telefoon, e-mail, openingstijden, reserveringstijden |

## Nog invullen

`data/site.ts` bevat placeholders voor adres, telefoonnummer en e-mailadres.
Die waarden worden gebruikt in de nav, het reserveringsblok, de mailto-fallback
van het formulier, de footer en de structured data — vervang ze voordat de site
live gaat.

## Reserveringen

Het formulier draait volledig in de browser; er is geen server-side code.

Zonder configuratie opent een verzonden formulier de mailclient met alle
ingevulde gegevens in een vooringevulde mail naar het adres uit `data/site.ts`.

Later een Odoo-webhook toevoegen kan zonder de site te herbouwen als backend:
zet `NEXT_PUBLIC_RESERVATIONS_WEBHOOK_URL` (zie `.env.example`) en het formulier
post de aanvraag als JSON naar dat endpoint. Bij een fout valt het terug op
dezelfde mailto plus het telefoonnummer. Twee aandachtspunten: de waarde wordt
tijdens de build in de pagina gebakken, dus na wijzigen opnieuw builden, en het
endpoint moet CORS voor het domein van de site toestaan.

## Deploy

De build is een statische export (`output: 'export'`), dus er zijn geen
serverless functies nodig.

**Netlify** — base directory `woodpecker-diner`; `netlify.toml` in die map
regelt de rest (`npm run build`, publish `out`).

**Vercel** — root directory `woodpecker-diner`; de export wordt automatisch
herkend.

## Gemeten (Lighthouse, mobile, productiebuild)

Performance 98 · Accessibility 97 · Best practices 100 · SEO 100
(FCP 0,9 s · LCP 2,1 s · CLS 0 · TBT 90 ms)

De enige openstaande a11y-melding is kleurcontrast: het merkoranje `#C8563A`
haalt op crème en op donkerbruin ongeveer 3,5–4,0:1, waar WCAG AA 4,5:1 vraagt
voor tekst onder 24px. Dat is een merkbeslissing — het palet is ongewijzigd
overgenomen uit de briefing.
