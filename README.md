# Spring Cleaning — Website

Static Astro site for [springhousecleaners.com](https://springhousecleaners.com).

Rebuilt from scratch after the legacy WordPress site was compromised with malware in April 2026. This version has no database, no PHP, no plugins — just static HTML, CSS, and a Cloudflare Pages Function for the contact form.

## Stack

- **Astro 5** — static site generator
- **Tailwind CSS** — styling
- **Cloudflare Pages** — hosting (free tier)
- **Cloudflare Pages Functions** — contact form endpoint (free tier: 100k requests/day)
- **SendGrid** — transactional email delivery (contact form → info@springhousecleaners.com)

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

### 3. Set up SendGrid (for contact form)

The contact form submits to `/api/contact`, which is a Cloudflare Pages Function that sends email via SendGrid.

1. In your SendGrid account: **Settings** → **Sender Authentication** → **Authenticate Your Domain**
2. Add `springhousecleaners.com` as a sending domain → SendGrid will show DNS records to add (CNAMEs for DKIM)
3. Add those DNS records in Cloudflare DNS (after you've moved DNS to Cloudflare in step 4)
4. In SendGrid, create an API key with "Mail Send" permission → copy it
5. In Cloudflare Pages project → **Settings** → **Environment variables** → add:
   - `SENDGRID_API_KEY` = (your key)
   - `CONTACT_EMAIL` = `info@springhousecleaners.com`
   - `FROM_EMAIL` = `noreply@springhousecleaners.com` (or whatever you authenticated)
6. Redeploy. Contact form now works.

**Swapping email providers later:** The function talks to SendGrid's API directly. To switch to Resend, Mailgun, Postmark, etc., edit `/functions/api/contact.js` and update the API call — roughly 15 lines of code change. No other code touches the email provider.

### 4. Custom domain & DNS

1. In Cloudflare Pages project: **Custom domains** → **Set up a custom domain** → enter `springhousecleaners.com`
2. Cloudflare will prompt you to change nameservers at GoDaddy to Cloudflare's nameservers
3. **Before flipping nameservers**, import these existing DNS records into Cloudflare so Jordan's `info@` email keeps working:

```
MX   @   aspmx.l.google.com          priority 1
MX   @   alt1.aspmx.l.google.com     priority 5
MX   @   alt2.aspmx.l.google.com     priority 5
MX   @   alt3.aspmx.l.google.com     priority 10
MX   @   alt4.aspmx.l.google.com     priority 10
TXT  @   "v=spf1 include:_spf.google.com include:sendgrid.net ~all"
```

The SPF record includes `sendgrid.net` so SendGrid can send mail on behalf of the domain. SendGrid's domain authentication step will also generate DKIM CNAME records — add those when SendGrid shows them to you.

4. Jordan updates nameservers at GoDaddy → Cloudflare's two nameservers
5. Wait for propagation (usually under an hour)
6. Cloudflare auto-provisions SSL
7. Once the new site is confirmed live, cancel SiteGround

## Configuration

Edit **`src/config.js`** to update:

- Company name, email, phone, hours
- Service list (adds/removes services automatically across nav, footer, grids)
- City list (same)
- Google rating + review count (shows on homepage and in schema)

## Content

All page content lives in `src/content/` as markdown:

- `src/content/pages/` — privacy policy, terms of service
- `src/content/services/` — the 5 service pages
- `src/content/cities/` — the 13 city pages (data-driven, templates use cityInfo from config)
- `src/content/blog/` — 31 blog posts

To edit any page, edit the markdown file. No database, no admin panel.

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
├── functions/
│   └── api/
│       └── contact.js        # Form submission endpoint (Cloudflare Pages Function)
├── public/                   # Static assets, served as-is
│   ├── favicon.svg
│   ├── robots.txt
│   ├── _headers              # Cloudflare security + caching headers
│   └── _redirects            # Old URL fallbacks
├── src/
│   ├── components/           # Reusable UI (Header, Footer, CTA, etc.)
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

## Why static instead of WordPress?

1. **Structurally can't be hacked the same way.** No database, no PHP, no plugin updates. The April 2026 malware that took down the old site is impossible on a static site.
2. **~10x faster.** Pages load globally in under 500ms via Cloudflare's CDN.
3. **Free hosting.** Cloudflare Pages free tier is plenty for this traffic. Saves ~$30–$100/month vs SiteGround.
4. **No maintenance.** No plugin updates, no PHP version bumps, no caching layer to fight.
