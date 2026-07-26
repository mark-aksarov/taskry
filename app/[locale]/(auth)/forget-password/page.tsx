import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { forgetPassword } from "@/lib/actions/auth/forgetPassword";
import { redirectIfAuthenticated } from "@/lib/utils/redirectIfAuthenticated";

export default async function Page() {
  await redirectIfAuthenticated();

  return <ForgetPasswordPage action={forgetPassword} />;
}
