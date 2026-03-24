# Schema provisioning

**Template ID:** `aurora-template-travel` (Aurora Studio Template Registry).

Same provisioning model as the other marketplace templates (shared `init/provision.ts` / `init/register.ts`). See [When it runs](../aurora-template-grocery/init/README.md#when-it-runs) in the grocery init README. Use `templateId: "aurora-template-travel"` from Studio onboarding.

**Content regions:** `pnpm run generate:content-regions` (or `prebuild` before `pnpm build`) refreshes `init/content-regions.json` via `aurora-generate-content-regions` from `@aurora-studio/starter-core`. See [starter-core docs](https://github.com/Purple-Napkin/aurora-starter-core/blob/main/docs/content-regions.md).
