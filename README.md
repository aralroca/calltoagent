# CallToAgent Landing Page

Official marketing site for **calltoagent.com**, built with Next.js App Router and next-translate.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- next-translate (EN + ES)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## i18n

- Default locale: `en`
- Locales: `en`, `es`
- Translation files:
  - `locales/en/common.json`
  - `locales/es/common.json`

## SEO

- Metadata configured in `app/[locale]/layout.tsx`
- JSON-LD (`SoftwareApplication`) added in Hero section

## CTA behavior

All demo CTA buttons are centralized in `components/ui/DemoButton.tsx` and trigger:

```ts
onClick={() => alert('AVAILABLE SOON')}
```
