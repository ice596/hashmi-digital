# UPGRADE-PLAN.md — section by section (now → upgraded)
Per DESIGN.md. Edit in place, never rebuild. Facts, prices, links unchanged.

## index.html

1. **Head/meta** — now: Fredoka/Nunito preloads, cream theme. → Fraunces/Manrope subsets preloaded, theme-color --ink, same JSON-LD + canonical, updated OG.
2. **Header** — now: logo, 4 links, "free prototype" button. → same links; ink translucent blur bar, hairline bottom; CTA becomes persistent WhatsApp button (never leaves screen).
3. **Hero** — now: illustrated phones/blobs/mascot, Fredoka headline, CTA to #start. → full-bleed dark cinema: real AI ad loop (compressed hashmi-smashlab or salon) right side / background, Fraunces display headline with ONE gold italic word, free-ad hook line, primary WhatsApp CTA + ghost "See the ads", tiny gold meta labels. Illustration + blobs removed here (survive on light sections).
4. **Built-for strip** — now: 6 playful SVG chips. → keep as light relief strip, restyled minimal (meta type, hairline separators); add perfume + car wash + academies to match real niches.
5. **Two offers (svcs)** — now: 2 link cards. → light section, Fraunces headers, clearer from-prices, same links.
6. **WhatsApp feature (feat flip)** — now: chat phone mock w/ Glow Lounge. → becomes "bot demo" dark section: phone mock restyled, chat animation replays the REAL worker.js flow (Book now → service w/ AED prices → day → time → Booked!), auto-playing on scroll, link to /demos/whatsapp/. Copy tightened.
7. **Google feature** — now: search mock + boutique art. → stays light, condensed; same message "get found on google", tighter.
8. **Risk reversal (proto)** — now: APEX phone mock + mascot. → merged into "how it works" 3 steps band (send photo/WhatsApp → see it free → go live). Kills one scroll screen, keeps every fact.
9. **NEW: Ads portfolio (dark, staggered)** — does not exist. → "ads that sell." staggered 9:16 video cards: salon, academy, gym, perfume, car wash, karak/burger/kunafa premium row. Poster + tap-to-play, niche meta labels, one line each. Ends with WhatsApp ask ("Send one photo. Free ad in 24 hours.").
10. **Work/portfolio** — now: uniform cards grid. → Buzzworthy staggered editorial grid on dark, larger shots, same 7 items + same honest labels/links.
11. **Founding clients band** — now: one-line note + call button. → dark + gold full-width moment: "first 3 founding clients" as the signature serif statement, both CTAs.
12. **How (3 steps) + founder** — now: separate sections. → one light section; founder note kept verbatim (real trust), Earned link kept.
13. **Signature moment** — new, one only: giant Fraunces word between portfolio and pricing ("booked.") scroll-reactive, reduced-motion safe.
14. **Close + form** — now: cast of illustrations + confetti. → dark full-bleed close: serif ask, WhatsApp primary + calendar ghost, Netlify form kept as <details> unchanged (works, honest).
15. **Footer** — same links/structure, restyled ink + hairline, Arabic line kept.
16. **NEW sticky mobile WhatsApp bar** — orange, appears after hero, 44px+ targets.
17. **FAQ** — now: only on /pricing. → add 5-6 Q homepage FAQ (what is the free ad, who builds it, AI honesty, cancel anytime) with FAQPage JSON-LD, reusing pricing answers where true.

## /pricing/

- Hero: Fraunces restyle, same "one system, two parts" + jump links.
- Promise strip: 4 items restyled as gold meta + hairline columns.
- Tier cards: DESIGN.md tier spec (ink-2, hairline, gold "Best value"), identical prices/features/links.
- Comparison: dark section, the 1,900 card gets gold treatment; same numbers + RFS source link.
- FAQ/close: restyle only. genpricing.py absent → edit HTML directly.

## /academies/ (+ guides, /academies/check/)

- Same dark/gold/serif system via acad.css update; hero gets hashmi-academy.mp4 loop; keep quiz, guides, free-month offer, all copy facts. Bot demo animation swapped to academy flow (free trial → sport → age → day → time).

## /ads/

- Becomes full portfolio page matching homepage section: all 9 ads by niche, AED 750 single-ad fact kept, Get seen plans linked.

## Assets

- /assets/ads/: 9 mp4s copied from ~/Desktop/Hashmi Ads (Niche + Premium), compressed H.264 ≤2MB hero / ≤3MB others, poster JPGs, lazy-load.
- /assets/v7/fonts/: fraunces + fraunces-italic + manrope woff2 subsets (latin), font-display swap.
- Logos from Hashmi Ads folder → og.png refresh if needed.

## Checks before "ship it"
Console clean, links ok, wa.me/971501351630 everywhere, wa.js intact, prices verbatim, no em dashes (grep), no fake proof, Lighthouse 90+ mobile, 375/390px perfect, reduced-motion pass.
