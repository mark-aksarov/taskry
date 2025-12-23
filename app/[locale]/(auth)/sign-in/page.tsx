import { SignInPage } from "./SignInPage";
import { signIn } from "@/lib/actions/auth/signIn";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

export default async function AppSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string; status: string }>;
}) {
  await requireAuthPage();

  const { callbackUrl, status } = await searchParams;

  const actionWithCallbackUrl = signIn.bind(null, callbackUrl);

  return (
    <SignInPage
      action={actionWithCallbackUrl}
      resetPasswordSuccess={status === "reset-password-success"}
    />
  );
}
