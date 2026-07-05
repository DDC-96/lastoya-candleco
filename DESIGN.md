---
name: Lastoya Candle Co.
description: Small-batch, hand-poured candles from Riverside, CA — rooted in Zapotec heritage.
colors:
  flame: "oklch(0.72 0.130 67)"
  flame-dim: "oklch(0.55 0.120 67)"
  flame-text: "oklch(0.52 0.122 67)"
  ember: "oklch(0.48 0.090 32)"
  night: "oklch(0.97 0.008 72)"
  panel: "oklch(0.93 0.008 72)"
  panel-lift: "oklch(0.88 0.010 72)"
  ink: "oklch(0.15 0.012 65)"
  ink-dim: "oklch(0.44 0.010 65)"
  wire: "oklch(0.82 0.008 65)"
  wire-faint: "oklch(0.90 0.006 65)"
  overlay: "oklch(0.12 0.010 65)"
typography:
  display:
    fontFamily: "Alegreya, Georgia, serif"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.78
  label:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.10em"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.flame}"
    textColor: "{colors.night}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.flame-dim}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-ghost-hover:
    textColor: "{colors.ink}"
  input-default:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  input-focus:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
---

# Design System: Lastoya Candle Co.

## 1. Overview

**Creative North Star: "A Letter from Oaxaca"**

This system is built around the weight of a specific name, from a specific people, in a specific landscape. *Lastoya* — my heart, my love — is not a generic warmth signal. It is a Zapotec word from the valleys and mountains of Oaxaca, and the design system must carry that specificity without flinching. Everything here is dark, precise, and deliberately unhurried: a near-black body surface, one burnished amber accent that earns its presence through restraint, and two typefaces that read like correspondence rather than commerce.

The aesthetic is a candle-lit room, not a lifestyle brand. Surfaces are dark and still. The accent — `flame` — appears where fire should: on prices, CTAs, and hover states. Nowhere else. The type is set with the patience of someone writing by hand. Nothing performs warmth that isn't actually warm.

This system explicitly rejects three aesthetic modes. It is not the cold, white-space-as-luxury of European perfume brands (Aesop, Diptyque). It is not the pastel, rounded, motivational energy of Instagram wellness. It is not the kraft-paper, handwritten-font, craft-fair rustic that reduces meaningful heritage to kitsch. Lastoya is bold and culturally specific — those aren't adjectives here, they're load-bearing facts about the brand.

**Key Characteristics:**
- Light-first: body background at `oklch(0.97 0.008 72)`. Never a dark or neutral theme.
- One primary accent (`flame`). Its rarity makes it mean something.
- Zero border-radius across the entire system. Edges are commitments.
- Alegreya (display serif) paired with Jost (geometric sans) — heritage weight meeting contemporary legibility.
- Flat elevation: depth through three tonal surface levels, never shadows.
- Motion is present and intentional: scroll-reveals, hover transforms, drawer transitions — all easing `cubic-bezier(0.16, 1, 0.3, 1)`. Fully reduced-motion-safe.

## 2. Colors: The Amber Room

A single-accent palette built around one moment of warmth in a dark field. The accent earns its weight by appearing nowhere it isn't needed.

### Primary
- **Burnished Amber (`flame`)** (`oklch(0.72 0.130 67)`): The candle. Used on CTAs, prices, hover states, active nav indicators, and focus borders. Never decorative. Never for body copy.
- **Deep Amber (`flame-dim`)** (`oklch(0.55 0.120 67)`): `flame`'s hover/pressed state. Also used for collection kicker labels where `flame` would be too assertive.
- **Amber Text (`flame-text`)** (`oklch(0.52 0.122 67)`): The accessible text-only variant of `flame`. Use exclusively for amber-colored text on light surfaces (`night`, `panel`). Achieves ~5:1 contrast ratio on `night`. Never use as a background color — that role belongs to `flame`.

### Secondary
- **Ember (`ember`)** (`oklch(0.48 0.090 32)`): A burnt rust, distinct from amber. Used exclusively for collection labels (SIGNATURE, LIMITED) — the one place the brand allows a second warm tone, and only in uppercase tracked labels.

### Neutral
- **Void (`night`)** (`oklch(0.97 0.008 72)`): The body. Not pure white — faintly warm, adding 0.008 chroma toward the brand's amber hue.
- **Surface (`panel`)** (`oklch(0.93 0.008 72)`): Elevated surfaces — cart drawer, order summary, footer background, form inputs.
- **Surface Lifted (`panel-lift`)** (`oklch(0.88 0.010 72)`): Second elevation layer — product image placeholders, hover surface shifts.
- **Ink (`ink`)** (`oklch(0.15 0.012 65)`): Primary text. Near-black with a faint warm cast.
- **Ink Muted (`ink-dim`)** (`oklch(0.44 0.010 65)`): Secondary text, labels, captions, placeholder text. Passes 4.5:1 against all three surface levels.
- **Wire (`wire`)** (`oklch(0.82 0.008 65)`): Visible borders — form input strokes, quantity selectors, scent note chips.
- **Wire Faint (`wire-faint`)** (`oklch(0.90 0.006 65)`): Structural hairlines — section dividers, footer border, order summary separators.
- **Overlay (`overlay`)** (`oklch(0.12 0.010 65)`): Dark overlay only — hero image gradient, product card hover veil, modal backdrops. Never used as a surface.

### Named Rules
**The One Flame Rule.** `flame` and `flame-dim` appear in at most three contexts per screen: the primary CTA, prices/totals, and one interactive state. Using it on four or more elements destroys its signal value. When in doubt, remove an instance.

**The Warm Surface Rule.** The body background is never pure white. The 0.008 chroma tilt toward hue 72 (amber-adjacent) is structural — it keeps the light surface alive and in the same color family as the accent. Do not substitute with `#ffffff` or a cool-tinted neutral.

## 3. Typography

**Display Font:** Alegreya (humanist-calligraphic serif, with Georgia, serif fallback)
**Body Font:** Jost (geometric-humanist sans, with system-ui fallback)

**Character:** Alegreya is a humanist serif designed by Huerta Tipográfica (Buenos Aires) with calligraphic origins — every stroke implies a hand. It carries both the weight of correspondence and the warmth of something drawn, not constructed. Jost is a geometric sans with humanist corrections: clean without coldness, legible without being clinical. Together they read like a brand that takes its words seriously and means every one of them.

### Hierarchy
- **Display** (weight 400, `clamp(2.5rem, 7vw, 5.5rem)`, line-height 1.05, tracking -0.02em): Page heroes, product names on PDP. Used at large scale where Alegreya's calligraphic stroke contrast becomes visible.
- **Headline** (weight 400, `clamp(1.75rem, 4vw, 3rem)`, line-height 1.15): Section headings — "The collection", "Made slowly, on purpose." `text-wrap: balance` on all h1–h3.
- **Title** (weight 400, `1.25rem–1.5rem`, line-height 1.3): Product names in cards, cart items, checkout summaries.
- **Body** (weight 400, `1rem`, line-height 1.78): Long-form prose — brand story, product descriptions. Max line length 65–75ch. `text-wrap: pretty` on multi-paragraph prose.
- **Label** (weight 500, `0.75rem`, letter-spacing 0.10–0.20em, uppercase): Section kickers, filter pills, collection badges, field labels. Jost only. Alegreya never in uppercase at small scale — the calligraphic serifs collapse.

### Named Rules
**The Alegreya Ceiling Rule.** Alegreya is a display face. Never use it for body copy below 18px, navigation links, form labels, or button text. At small scale its calligraphic details fight legibility. Jost handles everything below 18px.

**The Tracking Floor Rule.** Display headings use `tracking: -0.02em` minimum. Going tighter than `-0.04em` causes letterforms to touch; looser than `0` at display scale reads as insecure. Labels use `tracking: 0.10em` or wider — never tight-tracked uppercase.

## 4. Elevation

This system is flat by default. No box-shadows appear anywhere in the production codebase. Depth is expressed through three tonal surface levels (`night → panel → panel-lift`) and hairline structural borders (`wire`, `wire-faint`). There is no ambient glow, no drop shadow on hover, and no blur-based elevation.

The one exception: the primary button emits a low amber glow (`box-shadow: 0 0 28px oklch(0.72 0.130 67 / 0.40)`) on hover — this is not elevation, it is luminosity. The candle casts light; the button acknowledges that.

### Shadow Vocabulary
- **Button luminosity** (`0 0 28px oklch(0.72 0.130 67 / 0.40)`): Applied only to the primary button on `:hover`. Nowhere else. The effect should read as the button emitting light, not casting a shadow.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The only shadow in the system belongs to the primary button hover state, and it is technically a glow, not a shadow. If you find yourself reaching for `box-shadow` on a card or container, use tonal layering (`panel` vs `panel-lift`) and a `wire-faint` border instead.

## 5. Components

### Buttons
Invisible-structure philosophy: zero radius, borders and softening absent. The button's presence is purely its color and its text.

- **Shape:** Square (0px radius). No soft edges, no pill.
- **Primary:** `flame` background, `night` text, `px-8 py-4`. `hover:bg-flame-dim` + amber glow. Scale transform: `hover:scale-[1.015] active:scale-[0.985]` at `duration-200`.
- **Ghost:** Transparent background, `ink-dim` text. `hover:text-ink`. No border. Used for secondary actions like "Our story" or "View all."
- **Disabled:** `opacity-40`, no scale. Applies to both variants.
- **Focus:** `outline: 2px solid {colors.flame}`, `outline-offset: 2px`.

### Inputs / Fields
Same invisible-structure conviction as buttons.

- **Style:** `panel` background, `wire` border (1px), 0px radius, `px-4 py-3`.
- **Focus:** Border shifts to `flame` (`border-flame`). No glow, no ring — just the border color change.
- **Placeholder:** `ink-dim` at `oklch(0.58)` — meets WCAG AA 4.5:1 against `panel`.
- **Error / Disabled:** Not yet implemented; use `border-red-500` for error and `opacity-40` for disabled when needed.

### Navigation
- **Style:** `font-display` wordmark left, `font-sans` links right. Text-only, no containers, no underlines at rest.
- **Scroll behavior:** Transparent on hero, transitions to `bg-night/95` (backdrop blur `backdrop-blur-sm`) once scrolled past 20px.
- **Hover:** `text-ink-dim → text-ink`. Active route: `text-flame`.
- **Cart badge:** `bg-flame text-night`, `text-[10px]`, positioned absolute top-right of the bag icon.
- **Mobile:** Full-screen menu slides down via `AnimatePresence`. Links at `font-display text-3xl`.

### Product Cards
No card wrapper. The affordance is the image — no border, no shadow, no container. Text sits directly below.

- **Image:** `aspect-[4/5]`, `object-cover`, hover reveals a "Quick Add" overlay (`bg-night/80`, flame CTA).
- **Name:** `font-display text-base text-ink`.
- **Scent notes:** `text-xs text-ink-dim`, truncated to one line with `line-clamp-1`.
- **Price:** `text-sm text-flame tabular-nums`.
- **LIMITED badge:** `bg-ember text-ink text-[10px] uppercase tracking-[0.12em]`, positioned absolute top-right of the image.

### Cart Drawer
- **Style:** Fixed right-side panel, `w-full max-w-[400px]`, `bg-panel`, slides in via Framer Motion `x: "100%" → 0`.
- **Backdrop:** `bg-night/60` covering the rest of the screen.
- **Item rows:** Product thumbnail (`w-16 h-16`), name + scent in flex-col, quantity controls, per-item price.
- **Footer:** Sticky inside the drawer — subtotal and checkout CTA.

### Scent Note Chips
- **Style:** `border border-wire text-ink-dim text-xs px-3 py-1.5 tracking-wide`. No fill, no radius. Purely a labeled border.
- **Purpose:** Non-interactive. Display-only taxonomy on PDPs.

## 6. Do's and Don'ts

### Do:
- **Do** use `oklch(0.97 0.008 72)` (`night`) as the only body background. Never swap in a dark or neutral theme, even for sub-pages.
- **Do** reserve `flame` for CTAs, prices, and one interactive state per component. Count instances per screen; three is the ceiling.
- **Do** pair Alegreya display headings with Jost body text. This is the only approved pairing.
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on long prose paragraphs.
- **Do** use OKLCH throughout. This is the project's canonical color format. If a tool requires hex, convert at the tool boundary; do not change the source tokens.
- **Do** reference the Zapotec meaning of the brand name — "my heart, my love" — in copy that contextualizes heritage. It is not a footnote; it is the product story.
- **Do** cover `prefers-reduced-motion`. Every animated element must have a reduced-motion path (instant transition or crossfade).
- **Do** use three tonal surface levels (`night → panel → panel-lift`) and `wire-faint` hairlines for depth. No shadows except the primary button glow.

### Don't:
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent on any element. Side-stripe borders are prohibited across the system.
- **Don't** use gradient text (`background-clip: text` + gradient). Single solid color only.
- **Don't** use glassmorphism — blurred, frosted surfaces as decoration. Backdrop blur appears only on the sticky nav, for legibility, not aesthetics.
- **Don't** introduce cold, austereaesthetics — white backgrounds, sparse European-minimalist layouts, "expensive silence." This is not Aesop. This is not Diptyque. The brand is warm and present, not aspirationally distant.
- **Don't** use pastel colors, rounded button corners, motivational copy ("self-care", "ritual", "glow up"), or Instagram wellness visual language of any kind.
- **Don't** use kraft textures, handwritten fonts, twine-and-mason-jar visual language, or any rustic-Etsy aesthetic. Zapotec heritage is not folk kitsch.
- **Don't** use Alegreya below 18px, in uppercase labels, or for body text. It is a display face only.
- **Don't** introduce new palette hues. `flame`, `ember`, and the neutral ramp are the full color vocabulary. There is no secondary brand color waiting to be added.
- **Don't** add border-radius to buttons or inputs. Zero radius is structural; it is not a default to override per component.
- **Don't** add eyebrow labels (small all-caps tracked kickers) above every section heading. One deliberate kicker in the hero is brand voice. An eyebrow before every `<h2>` is AI grammar.
