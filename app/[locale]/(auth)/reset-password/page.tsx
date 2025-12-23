import { notFound } from "next/navigation";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { resetPassword } from "@/lib/actions/auth/resetPassword";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

export default async function AppResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  await requireAuthPage();

  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  const actionWithCallbackUrl = resetPassword.bind(null, token);

  return <ResetPasswordPage action={actionWithCallbackUrl} />;
}
