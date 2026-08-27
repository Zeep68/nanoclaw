# The Woodpecker Diner — website

Next.js 15 (App Router) site voor The Woodpecker Diner in Dordrecht.

## Draaien

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

## Structuur

| Pad | Doel |
|-----|------|
| `app/layout.tsx` | Fonts (Bebas Neue, Pacifico, Poppins via `next/font`), metadata |
| `app/page.tsx` | Pagina-opbouw + JSON-LD `Restaurant` |
| `app/globals.css` | Kleurvariabelen, knoppen, checkerboard-divider, formuliervelden |
| `app/api/reservations/route.ts` | POST-endpoint voor reserveringen |
| `components/` | Nav, Hero, MenuSection, About, Reserve, Footer, Bird |
| `data/menu.ts` | Volledige lunch-, diner- en drinkskaart |
| `data/site.ts` | Adres, telefoon, e-mail, openingstijden, reserveringstijden |

## Nog invullen

`data/site.ts` bevat placeholders voor adres, telefoonnummer en e-mailadres.
Die waarden worden gebruikt in de nav, het reserveringsblok, de mailto-fallback
van het formulier, de footer en de structured data — vervang ze voordat de site
live gaat.

## Reserveringen

Het formulier post naar `/api/reservations`. Zonder configuratie logt dat
endpoint de aanvraag alleen en geeft het `200` terug. Zet
`RESERVATIONS_WEBHOOK_URL` (en optioneel `RESERVATIONS_WEBHOOK_TOKEN`) om
aanvragen door te sturen naar een backend zoals Odoo — zie `.env.example`.

Geeft het endpoint een fout terug, dan toont het formulier een mailto-link met
alle ingevulde gegevens plus het telefoonnummer, zodat een gast nooit vastloopt.

## Deploy

Vercel: root directory op `woodpecker-diner` zetten, framework wordt
automatisch herkend. Eventuele webhook-variabelen als environment variables
toevoegen.

## Gemeten (Lighthouse, mobile, productiebuild)

Performance 98 · Accessibility 97 · Best practices 100 · SEO 100
(FCP 0,9 s · LCP 2,1 s · CLS 0 · TBT 90 ms)

De enige openstaande a11y-melding is kleurcontrast: het merkoranje `#C8563A`
haalt op crème en op donkerbruin ongeveer 3,5–4,0:1, waar WCAG AA 4,5:1 vraagt
voor tekst onder 24px. Dat is een merkbeslissing — het palet is ongewijzigd
overgenomen uit de briefing.
