# Spring Cleaning — Website

Static Astro site for [springhousecleaners.com](https://springhousecleaners.com).

Rebuilt from scratch after the legacy WordPress site was compromised with malware in April 2026. This version has no database, no PHP, no plugins — just static HTML, CSS, and a BookingKoala embed for scheduling.

## Stack

- **Astro 5** — static site generator
- **Tailwind CSS** — styling
- **Cloudflare Pages** — hosting (free tier)
- **BookingKoala** — handles all quote/booking flow (embedded iframe on `/contact/`)

## Quick start

```bash
npm install
npm run dev       # Local dev server at http://localhost:4321
npm run build     # Production build to ./dist
npm run preview   # Preview production build locally
```

## Deployment (Cloudflare Pages)

### 1. Push to GitHub
Push this repo. `.gitignore` excludes `node_modules` and `dist`.

### 2. Connect to Cloudflare Pages
In Cloudflare dashboard: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

Build settings:
- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Environment variable:** `NODE_VERSION=20`

Click **Save and Deploy**.

### 3. Custom domain & DNS

1. In Cloudflare Pages project: **Custom domains** → **Set up a custom domain** → enter `springhousecleaners.com` (and `www.springhousecleaners.com`)
2. Cloudflare will prompt you to change nameservers at GoDaddy to Cloudflare's nameservers
3. **Before flipping nameservers**, import these existing DNS records into Cloudflare so email keeps working:

```
MX   @   aspmx.l.google.com          priority 1
MX   @   alt1.aspmx.l.google.com     priority 5
MX   @   alt2.aspmx.l.google.com     priority 5
MX   @   alt3.aspmx.l.google.com     priority 10
MX   @   alt4.aspmx.l.google.com     priority 10
TXT  @   "v=spf1 include:_spf.google.com ~all"
CNAME default._domainkey <Google DKIM target>
```

4. Update nameservers at GoDaddy to the two Cloudflare nameservers
5. Wait for propagation (usually under an hour)
6. Cloudflare auto-provisions SSL
7. Once live, cancel SiteGround

## Configuration

Edit **`src/config.js`** to update:

- Company name, email, phone, hours
- Service list (adds/removes services automatically across nav, footer, grids)
- City list (same)
- Google rating + review count (shows on homepage and in schema)

## Content

All page content lives in `src/content/` as markdown:

- `src/content/pages/` — privacy policy, terms of service
- `src/content/services/` — the 4 service pages
- `src/content/cities/` — the 13 city pages (data-driven, templates use cityInfo from config)
- `src/content/blog/` — 31 blog posts

To edit any page, edit the markdown file. No database, no admin panel.

## Booking / Contact

The `/contact/` page embeds the BookingKoala booking widget. Customers see pricing, pick a service, and schedule themselves directly through BookingKoala's hosted flow. No backend needed on our side.

To update the booking embed, edit `src/pages/contact.astro`. Current embed source:
```
https://springcleaning.bookingkoala.com/booknow?embed=true
```

## Adding a new blog post

Create `src/content/blog/your-post-slug.md`:

```markdown
---
title: "Your Post Title"
date: "2026-04-17"
type: "blog"
---

Your post content in markdown.

## A heading

More content.
```

Push to GitHub. Cloudflare auto-deploys.

## Project structure

```
/
├── public/                   # Static assets, served as-is
│   ├── logo.png              # Full logo with wordmark
│   ├── logo-mark.png         # Icon-only (used in header)
│   ├── founders.jpg          # Jordan & Sofia photo
│   ├── og-image.jpg          # Social sharing image
│   ├── favicon.svg
│   ├── robots.txt
│   ├── _headers              # Cloudflare security + caching headers
│   └── _redirects            # Old URL fallbacks
├── src/
│   ├── components/           # Reusable UI (Header, Footer, CTA, FAQ, etc.)
│   ├── layouts/              # Page layouts (Base.astro)
│   ├── pages/                # Route files → URLs
│   ├── content/              # Markdown content
│   ├── styles/               # Global CSS
│   └── config.js             # Central config
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Design tokens

- **Primary:** `moss` (deep teal-green, `#0D4F4C`)
- **Accent:** `terra` (warm terracotta, `#D9593A`)
- **Background:** `cream` (`#FBF8F3`)
- **Text:** `ink` (`#1A1A1A`)
- **Display font:** Fraunces (variable serif)
- **Body font:** Geist

## SEO

The site ships with extensive structured data (JSON-LD):

- `HouseholdCleaningService` schema on every page with full business details
- `Service` schema on each service page
- `Service` + `AggregateRating` on each city page
- `FAQPage` with 7 questions on homepage, 5 questions on each city page (strong for AI search / Google rich results)
- `Review` schema on testimonials (4 real Google reviews)
- `BreadcrumbList` schema on all interior pages
- `LocalBusiness` data with address, geo coordinates, opening hours, and service areas

Per-city title and meta descriptions are optimized for local SEO ("House Cleaning Services in [City], TX").

## Why static instead of WordPress?

1. **Structurally can't be hacked the same way.** No database, no PHP, no plugin updates. The April 2026 malware that took down the old site is impossible on a static site.
2. **~10x faster.** Pages load globally in under 500ms via Cloudflare's CDN.
3. **Free hosting.** Cloudflare Pages free tier is plenty for this traffic. Saves ~$30–$100/month vs SiteGround.
4. **No maintenance.** No plugin updates, no PHP version bumps, no caching layer to fight.
