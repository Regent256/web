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

- `app/layout.tsx` holds the full `Metadata` object: `metadataBase` (set to the production domain above), title template, OpenGraph (`type: "profile"`), Twitter card, `alternates.canonical`, and explicit `robots` directives. Update the `siteUrl`/`title`/`description` consts at the top of the file rather than duplicating strings elsewhere.
- Structured data: a `Person` JSON-LD block (schema.org) is inlined in `app/layout.tsx` via a `<script type="application/ld+json">`. It covers name, jobTitle, description, url, image, email, telephone, `sameAs` (LinkedIn), and `knowsAbout`. Keep this in sync with the visible page content in `app/page.tsx` — search engines cross-check the two.
- Favicon/OG images are generated dynamically (not static files) via Next's Metadata Route conventions:
  - `app/icon.tsx` — 32×32 favicon ("TR" monogram, matches `Header.tsx`)
  - `app/apple-icon.tsx` — 180×180 Apple touch icon
  - `app/opengraph-image.tsx` — 1200×630 OG/Twitter share image
  - There is no static `app/favicon.ico` anymore — it was the unused default Next.js logo and was removed in favor of the generated icon above. Edit these `.tsx` files (not an image editor) to change the icon design.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` (both reference the production domain directly — update if the domain ever changes).
- The profile photo `public/tomas-regner.png` is intentionally named after the person for image-search relevance; its `alt` text in `page.tsx` and the `image` field in the JSON-LD both should keep referencing this filename if it's ever replaced.

### Future authority-building (not yet implemented)

- Consider adding more `sameAs` entries to the Person JSON-LD as other verified profiles appear (GitHub, Behance, X/Twitter).
- If Google Search Console / Bing Webmaster Tools verification is set up, add the verification meta tag via `metadata.verification` in `layout.tsx`.
- A future articles/blog section would be the main lever for topical authority — no scaffolding for this exists yet; it would need new routes, not just metadata changes.
