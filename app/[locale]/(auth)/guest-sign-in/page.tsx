import { signIn } from "@/lib/actions/auth/signIn";
import { GuestSignInPage } from "./GuestSignInPage";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

export default async function AppSignInPage() {
  await requireAuthPage();
  return <GuestSignInPage signIn={signIn} />;
}
