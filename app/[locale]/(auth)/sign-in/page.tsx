import { SignInPage } from "./SignInPage";
import { signIn } from "@/lib/actions/signIn";
import { handleAuthPageRedirect } from "@/lib/utils/handleAuthPageRedirect";

export default async function AppSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string; status: string }>;
}) {
  await handleAuthPageRedirect();

  const { callbackUrl, status } = await searchParams;

  const actionWithCallbackUrl = signIn.bind(null, callbackUrl);

  return (
    <SignInPage
      action={actionWithCallbackUrl}
      resetPasswordSuccess={status === "reset-password-success"}
    />
  );
}
