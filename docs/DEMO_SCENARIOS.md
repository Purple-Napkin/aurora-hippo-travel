# Holmes Demo Scenarios

Deterministic demo flows for verifying Holmes adaptive storefront behaviour.

## Quick Start

1. Ensure Aurora API is running (`pnpm dev` in aurora-studio) and Aurora has provisioned products.
2. Run the ecom storefront: `pnpm dev` (port 3001).
3. Open `/demo` for scenario cards with direct links.
4. Open `/simulate` for side-by-side Holmes OFF vs ON with scripted user flows.

---

## Simulate Page

The `/simulate` page runs two iframes side-by-side:

- **Left** - Holmes OFF (`?holmes_disabled=1`) - no personalization
- **Right** - Holmes ON - adaptive UX driven by Holmes mission inference

A simulation engine runs the same user actions in both frames in parallel (typing, clicking, scrolling, navigation) so you can compare behaviour.

### How It Works

1. **Layout** - The layout uses `ConditionalHolmesScript`, which loads the Holmes script only when `holmes_disabled` is not in the URL. The left iframe loads pages with `holmes_disabled=1`, so Holmes never initialises there. The right iframe loads pages with `holmes_demo` (and optional context params), so Holmes runs in demo mode.

2. **Simulation steps** - Each scenario has a sequence of steps:
   - `goto` - Navigate to a path (e.g. `/catalogue`, `/checkout`)
   - `wait` - Pause for a configurable duration
   - `click` - Click an element (by selector, optionally filtered by text)
   - `type` - Type into an input (e.g. search)
   - `scroll` - Scroll within a container

3. **Context overrides** - When Holmes runs in demo mode, you can override signals via URL params so Holmes sees different context:
   - `holmes_time` - `morning` | `afternoon` | `evening`
   - `holmes_season` - `spring` | `summer` | `autumn` | `winter`
   - `holmes_day` - `weekday` | `weekend`
   - `holmes_device` - `mobile` | `tablet` | `desktop`
   - `holmes_referrer` - `direct` | `google` | `social` | `internal`

   These are passed into the right iframe and read by the Holmes script (aurora-studio). Use "Auto" in the UI to use real values.

### Controls

| Control | Description |
|---------|-------------|
| **Scenario** | Predefined flow (Browsing, Urgent, Discovery, Ready to Pay, Routine Shop) |
| **Speed** | Playback speed (0.25×-2×) |
| **Holmes init** | Wait after catalogue load for Holmes to infer (1.5-6 s) |
| **Typing** | Delay between keystrokes (20-150 ms) |
| **Step pause** | Delay between steps (100-800 ms) |
| **Context** | Time, Season, Day, Device, Referrer (or Auto) |

### Scenarios

| Scenario | Flow |
|----------|------|
| **Browsing** | Browse product → add to cart → browse more → add again → cart → basket bundle → checkout |
| **Urgent** | Product → add to cart → checkout (fast path) |
| **Discovery** | Focus search → type "milk" → browse result → add to cart |
| **Ready to Pay** | Add 2 items → checkout (payment focus) |
| **Routine Shop** | Scroll catalogue → product → add to cart → catalogue |

---

## Demo Parameter

Append `?holmes_demo=mission` to any page URL. Holmes persists this in `sessionStorage` so it survives navigation (catalogue → cart → checkout).

| Mission               | Effect                                                        |
| --------------------- | ------------------------------------------------------------- |
| `urgent_replenishment`| Hides checkout-extras, cross-sell; highlights payment         |
| `browsing`            | Expands discovery; recommendations visible                   |
| `ready_to_pay`        | Payment focus, checkout compression                           |
| `routine_shop`        | Standard flow, no directives                                  |
| `discovery`           | Expand discovery, new arrivals favored                        |

## Verification Steps

### Urgent scenario (5.2.1)

1. Go to `/catalogue?holmes_demo=urgent_replenishment`
2. Add an item to cart
3. Proceed to checkout
4. **Verify:** `[data-holmes=checkout-extras]` has class `holmes-hidden`
5. **Verify:** Promo code / cross-sell section hidden

### Browsing scenario (5.2.2)

1. Go to `/catalogue?holmes_demo=browsing` or a product page
2. **Verify:** Recommendations section visible (not hidden)
3. **Verify:** "You May Also Like" shows Holmes picks with ✨

### "Why this?" (5.2.3)

1. Use any demo scenario that returns a bundle (e.g. `browsing`, add to cart)
2. On product page or cart, when Holmes injects recommendations
3. **Verify:** "Why this?" button appears
4. Click **Verify:** Reasoning tooltip expands

## E2E Tests

```bash
# First time: install browser
pnpm test:e2e:install

# Requires: ecom dev server (pnpm dev) + Aurora API. Runs automatically if not up.
pnpm test:e2e

# With UI
pnpm test:e2e:ui
```

Tests cover:

- Demo page loads and shows all scenario cards
- Urgent: `[data-holmes=checkout-extras]` has `holmes-hidden` when cart has items + holmes_demo
- Browsing: `[data-holmes=recommendations]` visible and not hidden on product page
- sessionStorage: holmes_demo persists across navigation

Tests skip gracefully when catalog is empty (no products).

## Control Dashboard

Open Holmes Control in Aurora Studio to see live inferences. Demo-mode requests appear with `holmes_demo` in the signals payload.
