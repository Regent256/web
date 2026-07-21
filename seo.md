# SEO — stav a pravidla pro další obsah

Tento dokument popisuje, co je na webu `tomasregner.cz` z hlediska SEO
vyřešené, kde to v kódu najdeš, a na co musíš myslet při přidávání
jakékoli nové stránky (podstránky, blogu, atd.). Cíl: každá nová stránka
by měla dodržet stejný standard, ne se muset SEO řešit znovu od nuly.

## 1. robots.txt

Generuje se dynamicky v `app/robots.ts`. Aktuálně: povoleno vše, zakázáno
`/admin` a `/api/`. Tyto cesty na webu zatím fyzicky neexistují — pravidla
jsou tam preventivně, aby je crawler nikdy neindexoval, kdyby v budoucnu
vznikly (admin rozhraní, API routy apod.).

**Když přidáš novou sekci, kterou NECHCEŠ indexovat** (interní nástroj,
draft obsah, apod.), přidej její cestu do `disallow` pole v `app/robots.ts`.

## 2. sitemap.xml

Generuje se dynamicky v `app/sitemap.ts`. Obsahuje `lastModified`,
`changeFrequency` a `priority` pro každou URL.

**Důležité:** sitemap NENÍ automaticky odvozená ze složky `app/` — je to
ručně psané pole. Web je zatím jednostránkový, takže je tam jen jedna
položka. **Až přidáš jakoukoli novou stránku (routu), musíš ji ručně
přidat do `app/sitemap.ts`**, jinak ji Google přes sitemap nenajde
(najde ji časem přes odkazy, ale sitemap to urychlí).

## 3. Meta tagy (title / description / canonical)

Definované centrálně v `app/layout.tsx` přes `export const metadata`.
Pravidla, která dodržet i u nových stránek:

- **title**: 50–60 znaků. Layout používá `title.template: "%s — Tomáš Regner"`
  — nová podstránka může exportovat jen svůj vlastní `title: "Něco"` v
  `metadata` a jméno se doplní automaticky.
- **description**: 150–160 znaků, věcný popis obsahu té konkrétní stránky
  (ne obecná fráze zkopírovaná z homepage).
- **canonical URL**: přes `alternates.canonical`. Na homepage je `"/"`.
  Na podstránce nastav absolutní nebo relativní cestu té stránky, ať se
  předejde duplicitnímu obsahu (např. s/bez trailing slash, query parametry).

Podstránka toto nastaví přes vlastní `export const metadata` (nebo
`generateMetadata`, pokud bude obsah dynamický) v jejím `page.tsx` —
Next.js metadata z `layout.tsx` a z `page.tsx` se mergují automaticky.

## 4. Open Graph & Twitter Cards

Základ (`openGraph`, `twitter`) je v `app/layout.tsx` a platí jako výchozí
pro všechny stránky. Pokud nová stránka má výrazně jiný obsah než
homepage (např. článek na blogu), přepiš `openGraph.title` /
`openGraph.description` v jejím vlastním `metadata` exportu — zdědí se
zbytek (typ, locale, siteName) a přepíšou se jen pole, která uvedeš.

## 5. OG obrázek (1200×630)

`app/opengraph-image.tsx` generuje obrázek dynamicky (Next.js
`ImageResponse`, ne statický soubor) — černé pozadí, bílý kruh s "TR",
jméno a pozice. Platí jako univerzální výchozí obrázek pro celý web.

Zvažovali jsme vygenerování přes Nanobanana/Gemini Image, ale zůstalo se
u kódem generované varianty — je to jednodušší na údržbu (text se mění
v kódu, ne v grafickém nástroji) a přesně sedí na brand (černo-bílá,
stejný styl jako favicon a Header). Pokud v budoucnu vznikne
fotografičtější OG obrázek (např. z reálné fotky), stačí ho vygenerovat
externě a nahradit `opengraph-image.tsx` statickým souborem
`app/opengraph-image.png`.

**Homepage vs. univerzální varianta:** protože web má zatím jen jednu
stránku, homepage varianta = univerzální varianta (jsou to fyzicky ten
samý soubor). **Až přidáš podstránku s jiným obsahem** (např. článek),
můžeš pro ni vytvořit vlastní `app/nazev-routy/opengraph-image.tsx` —
Next.js automaticky použije specifičtější verzi pro danou routu a
obecnou nechá jako fallback pro zbytek webu.

## 6. Structured data (JSON-LD)

Tři schémata jsou v `app/page.tsx` (ne v layoutu!) — schválně, protože
mají platit **jen pro homepage**, ne pro každou budoucí podstránku:

- **`Person`** — jméno, pozice, kontakt, `sameAs` odkaz na LinkedIn.
- **`Organization`** — reprezentuje Tomáše jako podnikatelský subjekt
  (IČO 03356116, uvedeno přes `identifier`/`PropertyValue`, protože
  schema.org nemá vlastní property pro české IČO).
- **`WebSite`** — základní identifikace webu.

**Vědomě vynecháno: `SearchAction`.** Schema.org `SearchAction` (pro
Google "sitelinks search box") vyžaduje reálně fungující vyhledávací
stránku/endpoint (`urlTemplate` s `{search_term_string}`, který vrací
výsledky). Web žádné vyhledávání nemá — přidat `SearchAction` bez
funkčního vyhledávání by bylo nepravdivé strukturované data (Google to
buď ignoruje, nebo to může poškodit důvěryhodnost). **Pokud v budoucnu
přidáš vyhledávání na webu, tehdy dodej `SearchAction` do `WebSite`
schématu** — ne dřív.

**Zatím chybí, protože zatím není potřeba: `BreadcrumbList`.**
Breadcrumbs dávají smysl až od chvíle, kdy web má hierarchii stránek
(např. `/` → `/blog` → `/blog/nazev-clanku`). **Až vznikne první
podstránka, přidej do jejího `page.tsx` JSON-LD blok typu
`BreadcrumbList`** s `itemListElement` odpovídajícím skutečné cestě
(position, name, item URL pro každou úroveň).

## 7. Optimalizace obrázků

Všechny obrázky na webu jdou přes `next/image` (komponenta `Image` z
`next/image`), ne přes syrový `<img>`. Aktuálně se to týká jen
`public/tomas-regner.png` v `app/page.tsx` — má explicitní `width`,
`height` a popisný `alt` text.

**Pravidlo pro každý další obrázek na webu:**
- vždy přes `<Image>` z `next/image`, nikdy `<img>`,
- vždy explicitní `width` a `height` (zabraňuje CLS — posunu layoutu při
  načítání),
- `alt` text popisný a konkrétní (ne jen jméno souboru), pokud má obrázek
  vztah k Tomáši Regnerovi, uvádět jeho jméno v `alt` (pomáhá při Google
  Image Search),
- název souboru v `public/` popisný, ne `img1.png` apod.

## Checklist při přidávání jakékoli nové stránky

- [ ] Přidat routu do `app/sitemap.ts` (lastModified, changeFrequency, priority)
- [ ] Vlastní `title` (50–60 znaků) a `description` (150–160 znaků) v `metadata`
- [ ] `alternates.canonical` ukazující na tuto stránku
- [ ] Případně vlastní `openGraph`/`twitter` title & description, pokud se liší od homepage
- [ ] Zvážit vlastní `opengraph-image.tsx` pro danou routu, pokud má jiný obsah
- [ ] `BreadcrumbList` JSON-LD podle skutečné hierarchie cest
- [ ] Zkontrolovat, že žádná nová cesta nekoliduje s `disallow` v `app/robots.ts` (a naopak, že admin/interní věci tam patří)
- [ ] Všechny obrázky přes `next/image` s `width`/`height`/popisným `alt`

## Doporučení do budoucna (budování authority)

- **Google Search Console + Bing Webmaster Tools** — zaregistrovat web,
  ověřit vlastnictví (přes `metadata.verification` v `layout.tsx`), sledovat
  indexaci a first-page klíčová slova.
- **Více `sameAs` profilů** — přidat do `Person`/`Organization` JSON-LD,
  jakmile budou existovat ověřené profily (GitHub, Behance, X/Twitter...).
- **Obsahová sekce (blog/case studies)** — jediná skutečná páka pro
  budování topической autority (Google E-E-A-T). Vyžaduje nové routy,
  `Article`/`BlogPosting` JSON-LD na každém článku, `BreadcrumbList`,
  a interní prolinkování mezi souvisejícími články.
- **Core Web Vitals** — jakmile bude reálný provoz, sledovat v Search
  Console (LCP/CLS/INP); web je teď statický a jednoduchý, takže by měl
  být v pořádku, ale stojí za kontrolu po přidání dalšího obsahu/skriptů.
- **hreflang** — řešit, jen pokud vznikne anglická verze webu.
- **Interní odkazy** — až přibudou podstránky, propojit je mezi sebou
  (homepage → case studies → kontakt), ne je nechat jako izolované ostrovy.
