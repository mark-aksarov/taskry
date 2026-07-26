import { CheckEmailPage } from "./CheckEmailPage";
import { verifyAuthPageSession } from "@/lib/utils/verifyAuthPageSession";

export default async function AppCheckEmailPage() {
  await verifyAuthPageSession();

  return <CheckEmailPage />;
}
