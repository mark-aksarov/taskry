import { SignUpPage } from "./SignUpPage";
import { signUp } from "@/lib/actions/auth/signUp";
import { requireAuthPageSession } from "@/lib/utils/requireAuthPageSession";

export default async function AppSignUpPage() {
  await requireAuthPageSession();

  return <SignUpPage action={signUp} />;
}
