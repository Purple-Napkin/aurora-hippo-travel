import { redirect } from "next/navigation";

/** Legacy folio URL — bundles surface on the main For You page. */
export default function ForYouCombosRedirect() {
  redirect("/for-you");
}
