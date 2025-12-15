import { CheckEmailPage } from "./CheckEmailPage";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

export default async function AppCheckEmailPage() {
  await requireAuthPage();

  return <CheckEmailPage />;
}
