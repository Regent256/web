# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the local dev server (Turbopack) at http://localhost:3000
- `npm run build` — production build (also runs TypeScript type-checking)
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (flat config via `eslint-config-next`)

No test suite is configured in this project.

If a shell reports `node`/`npm`/`brew` as not found, Homebrew's bin directory isn't on PATH for that shell session — prefix commands with `export PATH="/opt/homebrew/bin:$PATH"`.

## Architecture

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4.
- This is a single-page personal business card site (Tomáš Regner — UX & e-commerce consultant), not a multi-route app. `app/page.tsx` holds the entire page content (photo, name, title, contact list).
- `app/layout.tsx` is the root layout: wraps all content in `<Header />` + `<main>{children}</main>` + `<Footer />`, loads the Geist font family, and sets page `metadata`.
- `app/components/` holds `Header.tsx` and `Footer.tsx` — small, stateless, no props.
- Styling uses Tailwind v4's CSS-first config in `app/globals.css` — there is no `tailwind.config.js`. Theme tokens (colors, fonts) and custom utilities like the `animate-fade-in-up` keyframe are defined inline via `@theme`. Add new design tokens or animations the same way, directly in `globals.css`.
- `public/tomas-regner.png` is the real profile photo, rendered via `next/image` in `page.tsx`.
- Path alias `@/*` resolves to the project root (`tsconfig.json`), though existing code uses relative imports (`./components/...`).

## Deployment

- GitHub repo: `Regent256/web`, default branch `main`.
- Vercel's Git integration auto-deploys on every push to `main` (Vercel project `web`). No separate CI config exists — Vercel runs `next build` directly.
- Production domain: `https://www.tomasregner.cz` (apex `tomasregner.cz` redirects to it but has no valid TLS cert on `https://` yet — always use the `www` host in absolute URLs, metadata, and structured data).

## SEO

**See `seo.md` for the full picture** — what's implemented, why, and a
checklist to follow for every new page/route added to this site. Read it
before adding any subpage; don't reinvent the SEO approach per-page.

Quick pointers to where things live:

- `app/layout.tsx` — site-wide `Metadata` (title template, OpenGraph, Twitter, `alternates.canonical`, `robots`). `metadataBase` is the production domain above.
- `app/page.tsx` — homepage-only JSON-LD (`Person`, `Organization`, `WebSite`). Deliberately kept out of `layout.tsx` so future subpages don't inherit homepage-specific schema; subpages should add their own `BreadcrumbList` instead.
- `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` — dynamically generated (not static files) favicon/Apple icon/OG image, "TR" monogram matching `Header.tsx`. There is no static `app/favicon.ico` anymore.
- `app/sitemap.ts`, `app/robots.ts` — generate `/sitemap.xml` and `/robots.txt`. Sitemap entries are a manually maintained list, not auto-derived from routes — add new pages by hand.
