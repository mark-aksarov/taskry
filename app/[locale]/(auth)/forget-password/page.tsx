import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { forgetPassword } from "@/lib/actions/auth/forgetPassword";
import { requireAuthPageSession } from "@/lib/utils/requireAuthPageSession";

export default async function Page() {
  await requireAuthPageSession();

  return <ForgetPasswordPage action={forgetPassword} />;
}
