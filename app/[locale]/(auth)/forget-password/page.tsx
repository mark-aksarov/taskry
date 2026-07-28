import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { redirectIfAuthenticated } from "@/lib/utils/redirectIfAuthenticated";

export default async function Page() {
  await redirectIfAuthenticated();

  return <ForgetPasswordPage />;
}
