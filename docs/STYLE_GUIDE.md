# Aurora Ecom Starter — Major Supermarket Chain Style Guide

A design system for storefronts that convey **trust, freshness, and professionalism** — the hallmarks of established supermarket chains (Tesco, Sainsbury's, Waitrose, Coles, Woolworths).

---

## 1. Typography

### Principles
- **Legibility over personality.** Supermarkets serve all ages; type must be instantly readable.
- **One family, multiple weights.** Single-font systems feel coherent and professional.
- **Avoid geometric display fonts** (Syne, Space Grotesk, etc.) — they read as techy/startup, not grocery.

### Font Stack
| Role | Font | Weights | Use |
|------|------|---------|-----|
| Display & Body | **Plus Jakarta Sans** | 400, 500, 600, 700 | Headlines, body, nav, buttons |

**Why Plus Jakarta Sans?** Humanist sans-serif with warmth and clarity. Used by premium brands. Excellent readability at scale. Slightly rounded terminals feel approachable without being playful.

### Scale
- **Headlines (h1):** 2.25rem–3.5rem (36–56px), weight 700, tracking-tight
- **Subheadings (h2):** 1.25rem–1.5rem (20–24px), weight 600
- **Body:** 1rem (16px), weight 400; line-height 1.5
- **Small / metadata:** 0.875rem (14px), weight 500 or 400

---

## 2. Color Palette

### Primary (Light Theme — Default for Supermarkets)
| Token | Hex | Use |
|-------|-----|-----|
| `--supermarket-bg` | `#F8FAF5` | Page background (subtle green-white) |
| `--supermarket-surface` | `#FFFFFF` | Cards, nav, modals |
| `--supermarket-primary` | `#15803D` | CTAs, links, accents (forest green) |
| `--supermarket-primary-dark` | `#166534` | Hover states, text on light |
| `--supermarket-accent` | `#EA580C` | Deals, urgency, sale badges |
| `--supermarket-text` | `#1C1917` | Primary text (warm black) |
| `--supermarket-muted` | `#64748B` | Secondary text |
| `--supermarket-border` | `#E5E7EB` | Borders, dividers |

### Rationale
- **Green** = freshness, trust, nature (universal grocery association)
- **Warm white** = clean without feeling sterile
- **Orange accent** = deals and urgency (Sainsbury's, Aldi)

---

## 3. Components

### Hero
- **Background:** Full-bleed produce imagery with light overlay (20–30% white) — never dark
- **Headline:** Bold, confident, not shouty. Max 8–10 words.
- **CTA:** Primary green button; secondary outline or text button
- **No heavy drop shadows** — keep it clean

### Navigation
- White or near-white bar
- Green for active/logo accent
- Clear hierarchy: logo | links | search | location | cart | account

### Product Cards
- White background, 8–12px border radius
- Subtle shadow: `0 1px 3px rgba(0,0,0,0.08)`
- Hover: slight lift and stronger shadow
- Price prominent; sale badge in accent orange

### Buttons
- **Primary:** Solid green, white text, rounded-lg (8px)
- **Secondary:** Outline, green border, green text
- **Deal/Urgency:** Orange when applicable

---

## 4. Layout & Spacing

- **Max content width:** 1280px (max-w-6xl or max-w-7xl)
- **Section padding:** py-12 to py-16
- **Card gaps:** gap-4 to gap-6
- **Whitespace:** Generous; avoid cramped grids

---

## 5. Imagery

- **Hero:** High-quality produce, well-lit, muted saturation
- **Product:** Clean backgrounds, consistent aspect ratios
- **Avoid:** Stock-photo clichés, overfiltered looks

---

## 6. Motion & Interaction

- **Subtle:** 200–300ms transitions
- **Hover:** Slight opacity or shadow change; no aggressive animations
- **Focus:** Visible outline for accessibility

---

## Implementation Checklist

- [ ] Replace Syne + DM Sans with Plus Jakarta Sans
- [ ] Switch to light theme by default
- [ ] Apply supermarket color palette (green primary, warm neutrals)
- [ ] Hero: light overlay, refined typography, green CTA
- [ ] Nav: clean white bar, green accents
- [ ] Store bar, buttons, cards: align to palette
- [ ] Ensure `NEXT_PUBLIC_THEME=light` is default or recommended
