import { signIn } from "@/lib/actions/auth/signIn";
import { GuestSignInPage } from "./GuestSignInPage";
import { requireAuthPageSession } from "@/lib/utils/requireAuthPageSession";

export default async function AppSignInPage() {
  await requireAuthPageSession();
  return <GuestSignInPage signIn={signIn} />;
}
