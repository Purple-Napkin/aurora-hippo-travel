import { CommandSurface } from "./CommandSurface";

const DEFAULT_LOGO =
  "https://vnawbscpsiwkqniibyya.supabase.co/storage/v1/object/public/placeholders/hippo-ecom.png";

/** Hero with logo + shopping form. Logo from env or default. */
export function HeroCommandSurface() {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL ?? DEFAULT_LOGO;
  return <CommandSurface logoUrl={logoUrl} />;
}
