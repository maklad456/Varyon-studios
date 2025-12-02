# PRD V1 — Varyon Studios Website

(Implementation spec for Cursor / dev agent)

## 1. Project overview

**Name:** Varyon Studios – V0 Website

**Goal:** A single killer homepage + a few system pages that:

- Sell the idea within 60 seconds: “This is an AI-powered media studio that can replace or massively amplify traditional shoots.”
- Drive WhatsApp chats and lead capture (10% popup + free sample).
- Show 3 hero client examples (Woodworkers, Zee Plexiglass, Discovery Homes) plus a small before/after gallery.
- Hit Core Web Vitals “good” thresholds (LCP, INP, CLS) and Lighthouse ≥ 95 on performance for both mobile and desktop.
- Follow current SEO best practices from Google & Bing (title tags, meta, structured data, alt text, internal linking).

**Primary conversions:**

- Click “Get your free sample” → open WhatsApp chat.
- Submit 10% lead popup (name, company, email, phone, intent).

**Secondary:** click “Book a discovery call” (scroll to section / future calendar).

## 2. Brand system – implementation

Use this exact system in Tailwind tokens / CSS vars.

### 2.1 Color tokens

```
--vs-bg-light: #FAFFFD
--vs-bg-dark: #000000
--vs-text-strong: #000000
--vs-text-body: #485563
--vs-text-on-dark: #9CA3AF
--vs-accent-main: #10B981
--vs-accent-soft: #6EE7B7
```

Rules:

- Homepage = mostly black & white, with emerald + soft mint as small hits (buttons, underlines, small chips).
- Max 1 accent visible per fold.
- No extra colors (no purple, no extra blues, no orange, etc.).

### 2.2 Typography

- Logo only: keep existing logo font (Space Grotesk, etc.).
- Everything else: Suisse Int’l via `next/font/local`.
- Type scale: Hero 56–64px, H1 40px, H2 28–32px, H3 20–22px, Body 16px, Caption 12–13px.
- Eyebrows: 12–14px, all caps, tracking +0.08–0.12em.

### 2.3 Logo & motif usage

- `/public/branding/vs-logo-dark.png` — dark-on-light version.
- `/public/branding/vs-logo-light.png` — light-on-dark version.
- `/public/branding/vs-motif-diamond.png` — geometric motif (optional V-lines variant).
- Header: vs-logo-light on dark hero, vs-logo-dark on light.
- Size: ~120–140px desktop, ~90–110px mobile.
- Motif usage: faint background pattern in select sections.

## 3. Information architecture

- `/` – Homepage (main selling machine)
- `/case-studies` – simple grid with 3 case study detail pages or anchored sections.
- `/privacy-policy`, `/terms` – generic legal.
- Custom `/404` – Mount Media–style concept already implemented; just rebrand.

## 4. Homepage structure (section-by-section)

### 4.1 Global layout

Sticky header with logo, nav (Work, How it works, FAQ) and primary CTA “Get your free sample” (WhatsApp link). Mobile hamburger with slide-in menu. Footer includes tagline, quick links, contact block, address, copyright strip.

### 4.2 Hero (AI Media Agency–inspired)

- Full-screen hero, black background, looping video background (replaceable later), gradient overlay.
- Copy:
  - Eyebrow: AI-POWERED CONTENT STUDIO.
  - Headline: “Million-dollar photoshoots that actually sell.”
  - Sub-heading describing turning phone photos into cinematic campaigns.
- CTAs:
  - Primary: “Get your free sample” → WhatsApp.
  - Secondary: “Book a discovery call” → scroll to section.
- Micro trust row with monochrome logos for Woodworkers, Zee Plexiglass Designs, Discovery Homes.

### 4.3 First-visit 10% popup

- Trigger once per browser ~10–15 seconds after first visit.
- Form fields: Full name, Brand/Company, Email, Phone (required), optional dropdown “What are you looking for?”.
- CTA: “Get my 10% code”.
- Generate code `VS10-XXXX` (store in localStorage).
- Post-submit: show code + “Send code to my inbox” button hooking into EmailJS (user + admin templates). Fire GA4 event `lead_popup_submit`.

### 4.4 Problem framing – “Old way vs Varyon”

Two-column section on light background comparing traditional shoots vs. Varyon’s approach, with guarantee line.

### 4.5 Capabilities section

Black background grid of 6 cards (Product-only, Lifestyle, On-model, CGI/impossible, Detail/macro, Cinematic videos). Small line about pricing.

### 4.6 “How it works” (3-step)

Light background, 3 steps (Brief & strategy, Scene design & generation, Refine & deliver). CTA at bottom “See client stories”.

### 4.7 Case studies

Light background, 3 cards (Woodworkers, Zee Plexiglass, Discovery Homes) linking to `/case-studies`. Each describes problem, what we did, outcome.

### 4.8 Before/after gallery

3–6 cards showing before (plain) vs after (AI) images with captions.

### 4.9 “New generation” framing

Dark section with 3 columns: No logistics, No creative ceiling, No disconnect between brand and visuals.

### 4.10 Discovery call section (TKF hover)

Light background, copy + CTA “Book a discovery call” (WhatsApp or mailto). Right-hand interactive hover (“snake” effect) following cursor.

### 4.11 FAQ (AI Media Group–style)

Light background accordion with sample Q&A (Will people tell it’s AI? What do you need? How fast sample? Pricing? Brand guidelines?).

### 4.12 Final CTA strip

Dark strip above footer with heading “Ready to see what AI can really do for your brand?” Buttons: WhatsApp CTA + email link.

## 5. Other pages

### 5.1 /case-studies

Hero heading + 3 cards (Woodworkers, Zee, Discovery). Each opens detailed route `/case-studies/[slug]` (problem → approach → deliverables). Reuse Altitude structure.

### 5.2 /404

Keep glassy Mount Media concept but rebrand to Varyon (logo, copy “You’ve found a dead link — but we’d rather create something new for you.”, button “Back to homepage”).

### 5.3 Privacy & Terms

Simple templates describing cookies/analytics (GA4, Bing, EmailJS). Clarify no resale of data and liability.

## 6. Forms, codes & EmailJS flows

### 6.1 10% popup form

- Generate VS10-XXXX code client-side, store in localStorage.
- EmailJS Template 1: send code to user.
- Template 2: admin notification with form details + code.
- GA4 event `lead_popup_submit`.

### 6.2 25% rescue email

Manual email template (subject “25% off your first Varyon Studios order (72 hours only)”) referencing cap 10,000 EGP. No UI mention.

## 7. Analytics, SEO, GEO & performance

### 7.1 Analytics

Tools: GA4 + Microsoft Clarity. Events: `whatsapp_click`, `lead_popup_view`, `lead_popup_submit`, `hero_sample_click`, `book_call_click`, `case_studies_view`, `faq_toggle`.

### 7.2 SEO & GEO

- Use Next.js metadata API for title/description/keywords.
- OG/Twitter cards referencing headline.
- Schema.org Organization + LocalBusiness JSON-LD with Cairo address.
- Copy highlights “Cairo-based, serving brands globally”.

### 7.3 Performance & Core Web Vitals

- Target LCP < 2.5s (goal 1.5s on 4G), INP < 200ms, CLS < 0.1, Lighthouse ≥ 95 (mobile & desktop).
- Use Next.js `<Image>`, static generation (`dynamic = 'force-static'`), lazy-load below-the-fold sections, avoid heavy JS, prefer CSS transitions.
- Test via Lighthouse & web.dev/measure.

## 8. Assets & repo notes

- Repo: https://github.com/maklad456/Varyon-studios
- Branding assets (place under `/public/branding`).
- Font files: `/public/fonts/suisse-intl/` (regular, medium, semibold, bold).
- Placeholder hero media under `/public/media/hero/`.
- Placeholder before/after images under `/public/media/before-after/`.
- Include this PRD text as `/VARYON_PRD_V1.md` in the repo root.
