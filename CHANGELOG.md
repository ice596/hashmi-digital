# CHANGELOG — lux upgrade (branch: upgrade)
All work per DESIGN.md (Buzzworthy structure + Nobu mood) and UPGRADE-PLAN.md. Facts, prices and contacts unchanged.

## 2026-11-01

### Assets
- NEW /assets/ads/: 9 sample ads compressed from ~/Desktop/Hashmi Ads (720x1280 H.264 + poster JPGs, 0.9–2.6MB each) plus hero-loop.mp4 (580KB, 12s, muted) and hero-poster.jpg.
- NEW fonts: fraunces.woff2, fraunces-italic.woff2, manrope.woff2, amiri.woff2 (+arabic), self-hosted, variable, font-display swap. Fredoka/Nunito kept for non-lux pages.
- NEW /assets/v7/lux.css (design system layer) and /assets/v7/lux.js (scroll reveals, ad playback). site.css untouched except loading order.

### index.html (was: playful illustrated landing)
- Hero: was illustrated phones/blobs/mascot with CTA to #start → now dark cinema hero: real salon ad looping in a phone frame (labelled "Sample ad · made with AI by us"), Fraunces headline (same words), the free-ad hook box, WhatsApp primary CTA + "See the ads" ghost. Hero reveals are CSS-only so LCP never waits on JS.
- NEW sample-ads portfolio (#ads): 9 tap-to-play ads by niche, staggered dark grid, honest "no client work shown" labels, ends in the free-ad ask band. Mobile: swipe carousel.
- WhatsApp feature → bot demo section: chat animation now replays the real worker.js Glow Salon flow (Book now → Gel Manicure AED 150 → day → 17:00 → Booked!), labelled "Demo · Glow Salon is a sample business". Reduced-motion users see the final chat state.
- NEW signature moment: giant Fraunces "booked." scroll-reactive word (CSS scroll-driven, reduced-motion safe).
- How it works: 3 steps merged with the free-prototype risk reversal; founder note kept verbatim.
- Offers, comparison teaser (same numbers, links to /pricing/#compare), portfolio (same 7 items/links, staggered light grid, h4→h3), founding-clients band (dark gold), NEW 5-question FAQ with FAQPage JSON-LD, close + untouched Netlify form.
- Removed from homepage: Google-search feature art, cast/confetti art, Tappy mascot and tappy.js (mascot lives on in demos and the wa.js widget), old search/stamps animations.
- Head: Fraunces/Manrope preloads, hero poster preload, theme-color #141210, updated descriptions. ProfessionalService JSON-LD facts unchanged.

### /pricing/
- Restyled via lux.css overrides only; tier markup, prices, features, FAQ answers and WhatsApp links byte-identical. Dark ink canvas, Fraunces prices, gold Best value, comparison grid w/ gold Hashmi card, FAQ stays light.
- pricing.css opacity quirks overridden for WCAG AA.

### /academies/ (hub only; guides and /check keep their readable light style)
- Lux dark restyle; hero screenshots → academy sample ad loop in phone frame (labelled sample); all copy, AED 450, free month, guides and quiz links unchanged.

### /ads/
- Rebuilt as full portfolio: hero w/ free-ad hook, all 9 niche ads, the two original landscape samples (SMASH LAB, Stride) kept with their honest "made-up brand" captions, links to Get seen plans. AED 750 single-ad fact kept.

### Checks
- Lighthouse mobile: home 100/97/100/100 (a11y 97 = axe false positive: wa.js chat teaser bubble overlapping the form summary), pricing 99-100/100/100/100. LCP 1.4s, CLS 0.
- Zero console errors. All local links/assets verified. wa.me/971501351630 everywhere. No em dashes. No fake testimonials/clients. wa.js untouched and working.

### Not done / later
- site.zip not rebuilt, nothing on main, nothing deployed (awaiting "ship it").
- Old /assets/v7/vid kept (used by /ads/ landscape samples).
