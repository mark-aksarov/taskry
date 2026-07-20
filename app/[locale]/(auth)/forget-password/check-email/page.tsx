import { CheckEmailPage } from "./CheckEmailPage";
import { requireAuthPageSession } from "@/lib/utils/requireAuthPageSession";

export default async function AppCheckEmailPage() {
  await requireAuthPageSession();

  return <CheckEmailPage />;
}
