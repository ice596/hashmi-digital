# RESEARCH.md — Hashmi Digital site upgrade
Date: 2026-11-01. Sources: Firecrawl searches + scrapes, Awwwards listings, UAE agency pricing pages. No code, text or images copied from any site.

## 1. Award-level reference sites (what makes them feel expensive)

| # | Site | Why it feels expensive | Pattern worth stealing (principle only) |
|---|------|------------------------|------------------------------------------|
| 1 | buzzworthystudio.com (Awwwards-winning Brooklyn agency) | Dark canvas, huge display type, slow confident motion, one idea per screen | "Creative websites that convert" — luxury that still sells; CTA never hidden |
| 2 | koto.com (Koto Studio) | Editorial type scale, enormous whitespace, short sentences, case-study-first | Typography IS the design; few colors, strict grid |
| 3 | nobuhotels.com | Full-bleed photography/video, serif headlines, calm pacing, booking CTA fixed | Dark + warm accent + serif = instant luxury; booking button always visible |
| 4 | locomotive.ca | Oversized type, generous section padding (120px+), confident pauses | Section rhythm: one message, one visual, lots of air |
| 5 | clay.global (Awwwards agency directory top) | Product imagery front and center within first screen | Show the actual work in the hero, not an abstraction |
| 6 | thelinestudio.com (Awwwards SOTM) | Cinematic scroll reveals, restrained palette | Motion = few, slow, eased reveals; never busy |
| 7 | 28k.studio (Awwwards SOTM) | Minimal nav, massive headline, single accent color | Nav gets out of the way; 4 links max |
| 8 | bachoo.studio (Awwwards featured) | Signature interaction on hero, then calm | ONE signature moment, not ten |
| 9 | daybreak.studio | Warm palette, serif/sans pairing, human tone | Warm editorial tone sells trust (site now winding down — observed before close) |
| 10 | aesop.com | Muted tones, serif, zero clutter, product = hero | Calm consistency across every page builds brand worth |
| 11 | pentagram.com | Grid discipline, work speaks, minimal chrome | Let portfolio pieces be large and tappable |
| 12 | spabelles.com + grottagiustispa.com (Colorlib luxury spa roundup) | Serif fonts, high-res imagery, booking bar always present | Luxury service sites keep booking one tap away at all times |

Common DNA across all 12: (a) dark or very calm background, (b) one serif display face + one quiet sans, (c) real work/product visible in the first viewport, (d) 2x to 3x more whitespace than a normal site, (e) slow 0.6–0.9s eased reveals, (f) one persistent CTA, (g) tiny nav.

## 2. UAE / GCC competitor scan

| Agency | Offer framing | Pricing display | Trust building | CTA |
|--------|--------------|-----------------|----------------|-----|
| gcc-marketing.com | Tiered table Startup→Enterprise | AED 1,500 / 2,500 / 5,000 / 10,000 +VAT per month, public | Years in business, portfolio | Form + phone |
| si3.ae | "Affordable packages" | AED 1,249 / 2,499 / 5,000 public | DesignRush listing, portfolio | Form |
| ajmedia.ae | Services-first | Range only ("AED 4,000–12,000/mo") | FAQ page | Form |
| leadsdubai.com | Campaign tiers | AED 2,500 single channel; 9k/12k/20k campaigns | FAQ, lead calculator | Form + WhatsApp |
| bdazzil.marketing | Small-business page | AED 11,000 one-off + 3,000/mo | "Ambitious brands" positioning | Form |
| vpatch.ae | AI/CGI video + web + WhatsApp integration | Quoted per scope (hidden) | "50+ brands", Google reviews, in-house team story, FAQ answers "do you use AI?" honestly | **WhatsApp-first, prefilled message with source tag** |
| inbeat / semrush listings | Abu Dhabi retainers AED 3,000–50,000/mo | Mostly hidden | Client logos | Form |
| MeemGo, MK Digital (Instagram-first micro agencies) | AI UGC video + WhatsApp integration | "Starting from" teasers | Reels as proof | WhatsApp DM |

Takeaways vs Hashmi:
- Almost nobody in UAE publishes honest fixed prices → Hashmi's public fixed pricing is a differentiator; display it louder.
- V Patch is the closest model: WhatsApp-first CTA with prefilled text, AI video proof, honest AI FAQ. Hashmi already does all three; the gap is visual premium level and real video proof on the homepage.
- Nobody shows the product (a real ad, a working bot) in the hero. Everyone uses stock montage. Showing real AI ads playing = instant proof no competitor has.
- Hashmi AED 1,900/mo vs agencies 2,500–5,000+ confirmed by gcc-marketing, si3, leadsdubai, ajmedia data. Comparison section is credible; keep its numbers.

## 3. Conversion blueprint (each rule cites its source)

1. Hero must show the real product in ≤3s: autoplaying real AI ad (Clay #5, Nobu #3, V Patch gap analysis).
2. One serif display face for headlines, quiet sans body, nothing else (Koto #2, Aesop #10).
3. Dark sections + warm gold accent for the premium feel; keep orange for brand mark/CTA (Nobu #3, Buzzworthy #1).
4. Double the section padding; one message per screen (Locomotive #4, 28K #7).
5. Motion: scroll reveals 0.6–0.9s, ease-out, max 1 signature interaction; reduced-motion respected (The Line #6, Báchoo #8).
6. WhatsApp CTA persistent on every screen incl. sticky mobile button (spa sites #12, V Patch).
7. Prefilled WhatsApp messages per package/section (V Patch).
8. Honest trust without clients: founder face/name, live demos labelled as demos, real App Store app, free-prototype risk reversal (Daybreak #9 human tone; V Patch honesty FAQ).
9. Public fixed prices as a headline feature, not small print (gap vs all UAE competitors).
10. Portfolio pieces large, tappable, real (Pentagram #11).
11. Nav: 4 links + 1 CTA max (28K #7).
12. Mobile first: the UAE SMB owner is on a phone; booking/CTA reachable with thumb (spa roundup #12).

## 4. Scoring matrix — current site (1–10)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Clarity (10s test) | 7 | Hero says outcome in words, but shows illustration, not the product. No real ad visible anywhere on homepage |
| Trust | 6 | Founder line + real App Store app + honest demo labels good; no video proof, playful style undercuts "premium" claim |
| Visual quality | 5 | Clean but cartoon-friendly (Fredoka/Nunito, blobs, mascot) = "AED 2,900 site", not "AED 10k agency". Zero use of the premium ad aesthetic |
| Speed | 8 | Static, small CSS, self-hosted fonts already |
| CTA strength | 7 | Good prefilled WhatsApp links; but hero CTA goes to #start not wa.me; no sticky mobile WhatsApp |
| Mobile | 7 | Responsive, but tap targets/sticky CTA unverified; art-heavy hero on small screens |
| **Total** | **40/60** | Target after upgrade: 54+/60 |

Weakest three: visual quality, product proof in hero, premium/trust alignment.
