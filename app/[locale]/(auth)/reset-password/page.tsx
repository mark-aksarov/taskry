import { notFound } from "next/navigation";
import { ResetPasswordMode } from "@/lib/types";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";
import { resetPassword } from "@/lib/actions/auth/resetPassword";

export default async function AppResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; mode?: ResetPasswordMode }>;
}) {
  await requireAuthPage();

  const { token, mode } = await searchParams;

  if (!token) {
    notFound();
  }

  const resetPasswordWithToken = resetPassword.bind(null, token);

  return (
    <ResetPasswordPage
      mode={mode ?? "reset"}
      resetPassword={resetPasswordWithToken}
    />
  );
}
