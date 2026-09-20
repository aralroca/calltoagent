# calltoagent.com

Minimal domain-sale landing page for **calltoagent.com**, built with Next.js App Router, TypeScript and Tailwind CSS.

## Local development

```bash
bun install
bun run dev
```

## Configuration

Sale details live in `lib/sale-config.ts`. The current asking price is €15,000.

Set these environment variables locally and in Vercel:

```bash
RESEND_API_KEY=
ESCROW_PURCHASE_URL=
NEXT_PUBLIC_GA_ID=
```

- `RESEND_API_KEY` delivers offer notifications to `support@calltoagent.com`. The address must be permitted by the configured Resend account.
- `ESCROW_PURCHASE_URL` is optional. With no URL, **Buy securely** scrolls to the offer form.
- `NEXT_PUBLIC_GA_ID` is optional and enables the existing Google Analytics integration.

## Checks

```bash
bun run typecheck
bun run build
```
