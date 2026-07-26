import { SignUpPage } from "./SignUpPage";
import { signUp } from "@/lib/actions/auth/signUp";
import { redirectIfAuthenticated } from "@/lib/utils/redirectIfAuthenticated";

export default async function AppSignUpPage() {
  await redirectIfAuthenticated();

  return <SignUpPage action={signUp} />;
}
