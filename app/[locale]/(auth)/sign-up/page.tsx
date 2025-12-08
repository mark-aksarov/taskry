import { SignUpPage } from "./SignUpPage";
import { signUp } from "@/lib/actions/signUp";
import { handleAuthPageRedirect } from "@/lib/utils/handleAuthPageRedirect";

export default async function AppSignUpPage() {
  await handleAuthPageRedirect();

  return <SignUpPage action={signUp} />;
}
