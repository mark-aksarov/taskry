import { CheckEmailPage } from "./CheckEmailPage";
import { handleAuthPageRedirect } from "@/lib/utils/handleAuthPageRedirect";

export default async function AppCheckEmailPage() {
  await handleAuthPageRedirect();

  return <CheckEmailPage />;
}
