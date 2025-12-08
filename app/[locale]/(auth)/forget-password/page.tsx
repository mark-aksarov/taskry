import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { forgetPassword } from "@/lib/actions/forgetPassword";
import { handleAuthPageRedirect } from "@/lib/utils/handleAuthPageRedirect";

export default async function Page() {
  await handleAuthPageRedirect();

  return <ForgetPasswordPage action={forgetPassword} />;
}
