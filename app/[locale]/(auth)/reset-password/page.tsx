import { notFound } from "next/navigation";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { redirectIfAuthenticated } from "@/lib/utils/redirectIfAuthenticated";

export default async function AppResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  await redirectIfAuthenticated();

  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  return <ResetPasswordPage />;
}
