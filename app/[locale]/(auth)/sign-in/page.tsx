import { SignInPage } from "./SignInPage";
import { signIn } from "@/lib/actions/auth/signIn";
import { redirectIfAuthenticated } from "@/lib/utils/redirectIfAuthenticated";

export default async function AppSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) {
  await redirectIfAuthenticated();

  const { status } = await searchParams;

  return (
    <SignInPage
      signIn={signIn}
      resetPasswordSuccess={status === "reset-password-success"}
    />
  );
}
