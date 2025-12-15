import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { forgetPassword } from "@/lib/actions/forgetPassword";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

export default async function Page() {
  await requireAuthPage();

  return <ForgetPasswordPage action={forgetPassword} />;
}
