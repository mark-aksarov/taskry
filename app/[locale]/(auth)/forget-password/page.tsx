import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { forgetPassword } from "@/lib/actions/auth/forgetPassword";
import { verifyAuthPageSession } from "@/lib/utils/verifyAuthPageSession";

export default async function Page() {
  await verifyAuthPageSession();

  return <ForgetPasswordPage action={forgetPassword} />;
}
