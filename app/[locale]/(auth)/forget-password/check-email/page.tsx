import { CheckEmailPage } from "./CheckEmailPage";
import { redirectIfAuthenticated } from "@/lib/utils/redirectIfAuthenticated";

export default async function AppCheckEmailPage() {
  await redirectIfAuthenticated();

  return <CheckEmailPage />;
}
