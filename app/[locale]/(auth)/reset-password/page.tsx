import { notFound } from "next/navigation";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { resetPassword } from "@/lib/actions/auth/resetPassword";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

export default async function AppResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  console.log("Reset Password Page");

  await requireAuthPage();

  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  const resetPasswordWithToken = resetPassword.bind(null, token);

  return <ResetPasswordPage resetPassword={resetPasswordWithToken} />;
}
