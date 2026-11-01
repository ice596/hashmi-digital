# DESIGN.md — Hashmi Digital premium system
Blueprint extracted from buzzworthystudio.com (structure, motion, conversion). Mood layered from nobuhotels.com (color, serif, video, persistent booking). Principles only; no text, code or images copied. Date: 2026-11-01.

## 1. What comes from where

**From Buzzworthy (structure, motion, conversion):**
- One idea per screen. Each section is a full, calm statement with massive vertical padding.
- Hero: giant display headline, left-aligned, ONE word in the accent color, tiny uppercase meta text at the edges.
- Work shown as large asymmetric, staggered cards floating in dark space, not a uniform grid.
- One signature type moment mid-page (giant word reacting to scroll).
- Tiny uppercase tracking-wide labels ("RECENT WORK.") to open each section.
- Dark canvas end to end; sections separated by rhythm, not background stripes.
- CTA energy stays high even inside luxury: the contact ask repeats after every proof block.

**From Nobu (color + mood, layered on top):**
- Near-black warm charcoal instead of Buzzworthy's navy; gold accent instead of red.
- Serif display face instead of condensed caps. Calm, low-energy pacing.
- Full-bleed video as the hero texture (our real AI ads).
- Hairline borders (1px, low-alpha white) on transparent buttons; near-zero radius.
- A booking button that never leaves the screen (header CTA + sticky mobile WhatsApp bar).

**Ours, unchanged (brand constants):**
- Orange #E8560C stays: the hd logo mark, primary WhatsApp CTA fill, small highlights.
- Tappy mascot survives in light sections and the chat widget, not in dark luxury sections.
- wa.js widget, prefilled WhatsApp links, all facts/prices exactly as on the site.

## 2. Color tokens

```css
:root{
  --ink:        #141210;  /* near-black warm charcoal: dark section bg (Nobu) */
  --ink-2:      #1E1A17;  /* raised card surface on dark */
  --ink-3:      #2A241F;  /* hairline-adjacent surface, hover */
  --paper:      #FFF8F1;  /* existing cream: light sections keep it */
  --paper-2:    #F7EFE6;  /* light raised surface */
  --gold:       #E9C08A;  /* warm gold accent: serif italics, labels, rules */
  --gold-deep:  #C99E63;  /* gold on light bg (AA contrast), hover on dark */
  --orange:     #E8560C;  /* brand + primary CTA only, never body accents */
  --orange-deep:#C44509;  /* CTA hover */
  --white:      #FFFFFF;
  --t-ink-70:   rgba(255,248,241,.70); /* body text on dark */
  --t-ink-45:   rgba(255,248,241,.45); /* meta text on dark */
  --hairline:   rgba(255,255,255,.16); /* 1px borders on dark (Nobu) */
  --hairline-d: rgba(20,18,16,.14);    /* 1px borders on light */
  --green:      #1FA855;  /* WhatsApp semantics only */
}
```
Rules: dark sections use gold for accents and orange ONLY on the WhatsApp CTA. Light sections invert (ink text on paper). Never gold on paper without --gold-deep. WCAG AA checked per pairing.

## 3. Typography

- Display/headline: **Fraunces** (self-hosted woff2, opsz 72, weights 400+600). Gold italic for the one emphasized word per headline (Nobu serif + Buzzworthy single-accent-word).
- Body/UI: **Manrope** (self-hosted woff2, 400/500/700).
- Arabic: **Amiri** for Arabic headline touches, system fallback for body.
- Keep Fredoka ONLY inside the Tappy mascot/chat widget bubble if needed; remove from headings.

Scale (desktop / mobile), Buzzworthy-size, our faces:
```
display  clamp(44px, 7.2vw, 104px) / 1.02, Fraunces 600, -0.01em
h2       clamp(34px, 4.6vw, 64px)  / 1.08, Fraunces 600
h3       clamp(22px, 2.4vw, 30px)  / 1.2,  Fraunces 600
lede     clamp(18px, 1.6vw, 22px)  / 1.55, Manrope 400, --t-ink-70
body     16–17px / 1.6, Manrope 400
meta     12px / 1.4, Manrope 700, uppercase, 0.14em tracking, --gold or --t-ink-45
price    Fraunces 600, tabular feel, AED as meta-size prefix
```
Text density (Buzzworthy): headline ≤ 8 words, lede ≤ 24 words, section body ≤ 60 words. One ask per section.

## 4. Spacing, grid, radius, shadow

- Base unit 4px. Section padding: 120–160px desktop, 72–96px mobile (Buzzworthy air).
- Container: max 1200px, 24px gutter mobile, 48px desktop. Content column for text: max 640px.
- Grid: 12-col; work cards span 5–7 cols, offset vertically ±48–96px (staggered, Buzzworthy).
- Radius: 2px on dark-luxury elements (Nobu hairline feel); existing 16–20px rounded style allowed only in light/Tappy sections and chat UI.
- Borders: 1px --hairline instead of shadows on dark. Shadows only on light sections: 0 24px 64px rgba(20,18,16,.10).

## 5. Motion

- Reveal: opacity 0→1 + translateY 28px→0, 0.7s, cubic-bezier(.22,.61,.36,1), stagger 90ms, once per element (IntersectionObserver; CSS-only fallback).
- Signature moment (one, Buzzworthy's giant-word): full-width Fraunces word ("booked." / Arabic touch) that tracks scroll with a subtle skew/weight shift. CSS scroll-driven where supported, JS fallback, disabled on mobile + prefers-reduced-motion.
- Video: muted autoplay loop inline, no motion added on top.
- Hover: buttons lift 0 (no bounce), background/border 180ms ease; cards scale 1.015 max.
- prefers-reduced-motion: everything renders in final state, videos show poster with play tap.
- No scroll-jacking anywhere. No parallax on mobile.

## 6. Components

- **CTA primary**: orange fill, white text, 2px radius, 52px tall, WhatsApp glyph. Same element everywhere.
- **CTA ghost (dark)**: transparent, 1px --hairline border, white text, gold on hover (Nobu).
- **Sticky mobile bar**: bottom, ink bg + hairline top, one orange WhatsApp button, visible after hero, safe-area aware (Nobu persistent booking).
- **Section opener**: meta label in gold + Fraunces h2, left-aligned.
- **Ad card**: 9:16 video, poster, play-on-tap, niche label meta, hairline border.
- **Chat demo**: existing WhatsApp phone mock restyled minimal; messages from real worker.js flow.
- **Tier card (pricing)**: ink-2 surface, hairline, gold meta tag, Fraunces price; "Best value" = gold hairline + gold label (not a badge bubble).

## 7. Page skeleton rhythm (Buzzworthy order, our content)

dark hero (video) → light "built for" strip → dark problem/promise → how it works (light) → ads portfolio (dark, staggered) → bot demo (dark) → two offers + pricing summary (light) → comparison → founding clients (dark, gold) → FAQ (light) → final CTA (dark, full-bleed) → footer.
Every dark proof block ends with the WhatsApp ask (Buzzworthy repetition).

## 8. Hard constraints

- Static HTML/CSS/JS only. No framework, no build step beyond zip.
- Lighthouse 90+ mobile all four; LCP < 2.5s → hero video ≤ 2MB H.264 + poster, fonts subset + preloaded + swap.
- WCAG AA, 44px tap targets, semantic headings, aria on video.
- No em dashes in copy. No fake testimonials/logos/stats. Facts and prices from the brief, verbatim.
