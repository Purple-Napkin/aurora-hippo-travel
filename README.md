# Aurora template — Travel

Travel / experiences-oriented Aurora storefront template (same commerce core as the grocery template; customize copy, schema, and pages for your domain). Uses [`@aurora-studio/starter-core` (npm)](https://www.npmjs.com/package/@aurora-studio/starter-core).

**Live demo:** [travel.purple-napkin.com](https://travel.purple-napkin.com) · **Aurora Studio:** [aurora.purple-napkin.com](https://aurora.purple-napkin.com)

- **Studio:** template **Travel (example template)** (`aurora-template-travel`).
- **GitHub:** `Purple-Napkin/aurora-template-travel`.

See [Marketplace storefront docs](../aurora-studio/docs/marketplace-storefront-templates.md).

```bash
pnpm install && cp .env.example .env.local && pnpm dev
```

### Vertical theme (CSS tokens)

Defined in `app/globals.css` (`:root` / `[data-theme="dark"]`). Precedence: valid **`NEXT_PUBLIC_ACCENT_COLOR`** → Studio **`branding.accent_color`** from the API → template default (see async `app/layout.tsx` + `getResolvedStorefrontAccentForLayout` in starter-core).

| Token | Light | Dark |
|-------|-------|------|
| `--aurora-primary` | `#c2410c` | `#c2410c` |
| `--aurora-accent` | `#ea580c` | `#fb923c` |
| `--aurora-bg` | `#fffbf7` | `#1c1410` |
