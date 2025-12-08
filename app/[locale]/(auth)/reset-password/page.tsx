import { notFound } from "next/navigation";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { resetPassword } from "@/lib/actions/resetPassword";
import { handleAuthPageRedirect } from "@/lib/utils/handleAuthPageRedirect";

export default async function AppResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  await handleAuthPageRedirect();

  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  const actionWithCallbackUrl = resetPassword.bind(null, token);

  return <ResetPasswordPage action={actionWithCallbackUrl} />;
}
