# Wedding Website (Next.js + Tailwind)

## Run locally
1. Install deps
   npm install
2. Start dev server
   npm run dev

## Deploy to Vercel
- Push this repo to GitHub
- Import into Vercel
- Framework auto-detects as Next.js

## Quick edits
- Wedding details live in: app/wedding/WeddingWebsite.tsx (the `WEDDING` object)
- Replace photos in: public/photos/
- Update RSVP form URL in `WEDDING.rsvpFormUrl`

## Visual System

### 1) Color anchors (from code)
Use the existing palette in `THEME` as the non-negotiable anchor for generated imagery and overlays:
- **Maple** `#8b2f2f` (primary romantic accent)
- **Forest** `#2f4a3a` (natural grounding tone)
- **Gold** `#c8a25a` (editorial warmth / highlight)
- **Cream** `#fbfaf7` (soft base and negative space)

Recommended balance for image prompts: cream + forest as base, maple as accent, gold as restrained highlight.

### 2) Mood keywords
Default mood stack for prompts and curation:
- romantic
- warm
- natural
- editorial
- soft film grain

Optional add-ons when needed: timeless, intimate, airy, cinematic softness.

### 3) Composition constraints (for generated images)
- Preserve **safe text areas** for section headlines/CTA overlays (prefer clear negative space in upper-left, upper-center, or center-right depending on layout).
- If image is used as a **pure background texture**, avoid identifiable faces and direct eye contact.
- Do **not** bake readable text, logos, or signage into generated assets.
- Favor layered depth (foreground blur + midground subject + soft background) so copy remains legible with gradient overlays.
- Keep contrast moderate; avoid high-frequency detail in zones where body text may sit.

### 4) Export standards
- **Hero image**: 2400 x 1400 minimum (high-resolution source for responsive crops).
- **Section backgrounds (RSVP / Travel / FAQ / separators)**: 1920 x 1080.
- **Mobile crops**: produce a vertical-safe companion crop (recommended 1080 x 1350 or 1080 x 1440) while preserving core subject and text-safe area.
- Export in high-quality JPG (photo-heavy) or PNG/WebP when edge fidelity is important.

### 4.1) Performance image budget (must pass before merging)
Use these as hard caps to avoid regressions:

- **Hero background (active variant only):** `<= 350 KB`
- **Section background image (each):** `<= 220 KB`
- **Gallery photos (each):** `<= 300 KB`

If an image exceeds the cap, crop tighter, reduce quality, or simplify texture detail.

### 4.2) Modern format + fallback policy
- Export **AVIF first** (best compression), then **WebP** as fallback.
- Keep a **JPEG fallback** for compatibility when needed.
- For photo content rendered through `next/image`, Next.js will negotiate modern formats automatically; still provide optimized source files.
- For CSS/background images, ship explicit responsive assets (desktop + mobile) and prefer AVIF/WebP source files where possible.

### 4.3) Required naming + variants
Every hero and section background must include desktop/mobile variants:

- Hero: `hero-desktop.(avif|webp|jpg)` and `hero-mobile.(avif|webp|jpg)`
- Section examples: `travel-desktop.*` + `travel-mobile.*`, `rsvp-desktop.*` + `rsvp-mobile.*`

In code, wire both variants in `HERO_BACKGROUNDS` and `SECTION_BACKGROUNDS` so responsive switching is automatic.

### 4.4) Loading strategy (critical vs non-critical)
- **Preload only the active hero image** (desktop or mobile, never both).
- **Do not preload** section backgrounds or gallery images.
- Keep non-critical media lazy-loaded (`loading="lazy"` and default `next/image` lazy behavior).

### 4.5) Visual QA checklist (before publish)
Review imagery at these breakpoints and adjust crops/focal point when needed:

- **Mobile:** `390 x 844`
- **Tablet:** `768 x 1024`
- **Desktop:** `1440 x 900`

For each breakpoint, verify:
- Couple/subject focal point is not cropped awkwardly.
- Text-safe zones remain clear for headings and CTA buttons.
- Overlay + background contrast keeps body text readable.
- File size budget is still respected after final export.

### 5) Reusable prompt template
Use this template for batch generation:

```text
Subject: {subject}
Scene intent: wedding website background image
Mood: {mood_keywords}
Lighting: {lighting_style}
Palette: maple #8b2f2f, forest #2f4a3a, gold #c8a25a, cream #fbfaf7
Lens/style: {lens_style}
Composition: reserve clean negative space for headline copy in {safe_area}; layered depth; no readable text; no logos; if pure background then no recognizable faces
Texture/finish: soft film grain, gentle highlight rolloff, editorial natural color grading
Output: {resolution} plus mobile crop {mobile_resolution}
```

## Prompt Matrix (shortlist set)
Use these variants to batch-generate 8-12 candidates quickly and shortlist by legibility + mood fit.

| ID | Section Use | Subject Slot | Prompt Variant |
|---|---|---|---|
| H1 | Hero | Rustic venue exterior | Golden-hour farm venue, tree line, subtle floral foreground blur, ample upper-left copy space, romantic warm natural editorial look, soft film grain. |
| H2 | Hero | Countryside pathway | Winding path through meadow toward barn silhouette, cream sky gradient, center-right text-safe area, no people, cinematic softness. |
| H3 | Hero | Floral detail macro | Maple/cream bouquet close-up with shallow depth, abstracted background, left-side negative space for headline, delicate grain. |
| R1 | RSVP | Invitation vignette | Flat-lay of invitation textures, ribbon, pressed flowers, forest/maple accents, soft window light, top-center copy-safe zone, no readable wording. |
| R2 | RSVP | Candlelit table mood | Intimate table setting with candles and linen, warm gold highlights, right-side negative space, editorial natural grading, no logos/text. |
| T1 | Travel | Scenic road/arrival | Northern Ontario style road framed by trees at dusk, subtle atmospheric haze, upper-left text-safe area, no signage text. |
| T2 | Travel | Map-like texture | Abstract paper + contour texture inspired by travel maps, cream base with forest/maple linework, low-detail center panel for copy. |
| F1 | FAQ | Linen texture | Soft neutral linen/paper texture with gentle vignetting, minimal pattern noise, centered copy-safe zone, no figures. |
| F2 | FAQ | Botanical wash | Watercolor botanical wash in cream/forest/maple with restrained gold flecks, low-contrast midsection for FAQ text. |
| X1 | Divider/Global | Filmic grain gradient | Editorial gradient background (cream to forest with maple undertone), soft grain, no subject, designed for reusable section overlays. |

### Shortlisting rubric (quick)
- **Legibility first**: can headline + body copy pass contrast after overlay?
- **Palette fidelity**: does it clearly sit in maple/forest/gold/cream?
- **Mood match**: romantic + warm + natural + editorial + grain.
- **Versatility**: survives desktop and mobile crops without losing focal intent.
