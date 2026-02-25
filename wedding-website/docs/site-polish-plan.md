# Wedding Site Polish Plan (Rob + Nat)

This plan is based on the current single-page Next.js layout in `app/wedding/WeddingWebsite.tsx` and is organized by **impact vs effort**.

## 1) High-impact quick wins (1–2 sessions)

### A. Add a mobile nav menu
- Current top nav links are hidden on smaller screens (`md:flex`), so mobile visitors mostly rely on scrolling.
- Add a compact hamburger menu with anchor links to Details, Schedule, Venue, Photos, Travel, RSVP, FAQ, Registry.
- Include a sticky “RSVP” CTA in the menu panel.

**Why it helps:** Guests often browse from phones, and quick section jumps reduce friction.

### B. Improve hero clarity + conversion
- Add one short line under the hero title with **city + date + RSVP deadline**.
- Keep the two hero CTAs, but test stronger wording:
  - `RSVP now`
  - `Get directions`
- Add a “Add to calendar” button (Google/Apple/ICS).

**Why it helps:** Faster comprehension and better RSVP completion.

### C. Upgrade photo storytelling
- Replace the static 4-tile photo grid with one featured image + swipeable mobile carousel.
- Add 1-line captions (“Our first cabin trip”, “The proposal”, etc.).

**Why it helps:** Emotional connection is the biggest differentiator for wedding sites.

### D. Improve RSVP fallback and trust
- Keep the embedded Microsoft Form, but add:
  - “Takes ~1 minute” helper text.
  - A plain backup mailto link for edge cases.
  - A short privacy note (“Only used for wedding planning”).

**Why it helps:** Reduces drop-off when embedded forms fail on some devices.

## 2) Mid-effort enhancements (weekend project)

### A. Add a “Things to do nearby” section
- Include 4–6 cards: coffee, brunch, scenic stop, family activity.
- Add map links and approximate drive time from venue/hotel area.

### B. Transportation clarity
- Add a mini section under Travel:
  - Parking instructions
  - Taxi/rideshare availability
  - Suggested arrival window (e.g., arrive by 2:30 PM)

### C. Expand FAQ with practical day-of questions
- Recommended additions:
  - “Can I bring a plus-one?”
  - “What if I have food allergies?”
  - “Is there wheelchair/stroller accessibility?”
  - “Will the ceremony be unplugged?”

### D. Timeline visual treatment
- Change Schedule cards into a vertical/horizontal timeline with subtle connectors and icons.

## 3) Premium-level polish (if you want “wow”)

### A. Small interactions and ambient motion
- Add subtle parallax to hero image layers.
- Animate section dividers on scroll-in.
- Add tasteful hover transitions to cards and buttons (already partly done, can be made more cohesive).

### B. Personalized microcopy
- Convert generic text into your voice throughout the page.
- Add one short personal note in footer or near RSVP (“Can’t wait to celebrate with you!”).

### C. Event-week mode
- Add a date-based banner that switches near wedding week:
  - “This weekend!”
  - Weather reminder
  - Last-minute contact instructions

## 4) Accessibility + performance checklist

### Accessibility
- Ensure all interactive elements have visible focus states.
- Use semantic heading order and landmark regions.
- Add `aria-expanded` / keyboard controls for mobile nav.
- Verify contrast on gradient/overlay text in hero and image cards.

### Performance
- Convert key `<img>` tags to Next.js `<Image />` where practical.
- Use modern formats (`.webp`/`.avif`) for gallery photos.
- Compress hero background image and provide optimized local fallback.
- Run Lighthouse and aim for:
  - Performance ≥ 90
  - Accessibility ≥ 95

## 5) Suggested implementation order

1. Mobile nav + Add-to-calendar + hero copy tightening
2. RSVP trust/fallback improvements
3. Photo carousel + captions
4. Travel upgrades (things to do + transportation details)
5. Accessibility/performance pass

---

## Optional copy snippets you can drop in now

- Hero subline:
  - “August 22, 2026 • Hanmer, Ontario • RSVP by May 31”
- RSVP helper:
  - “The form takes about one minute and helps us plan seating, meals, and dance-floor chaos.”
- Footer note:
  - “We’re so grateful you’re celebrating with us.”
