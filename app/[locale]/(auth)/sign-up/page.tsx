import { SignUpPage } from "./SignUpPage";
import { signUp } from "@/lib/actions/auth/signUp";
import { verifyAuthPageSession } from "@/lib/utils/verifyAuthPageSession";

export default async function AppSignUpPage() {
  await verifyAuthPageSession();

  return <SignUpPage action={signUp} />;
}
