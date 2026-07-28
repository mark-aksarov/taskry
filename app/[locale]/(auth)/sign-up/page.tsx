import { SignUpPage } from "./SignUpPage";
import { redirectIfAuthenticated } from "@/lib/utils/redirectIfAuthenticated";

export default async function AppSignUpPage() {
  await redirectIfAuthenticated();

  return <SignUpPage />;
}
