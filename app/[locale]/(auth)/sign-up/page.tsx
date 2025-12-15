import { SignUpPage } from "./SignUpPage";
import { signUp } from "@/lib/actions/signUp";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

export default async function AppSignUpPage() {
  await requireAuthPage();

  return <SignUpPage action={signUp} />;
}
