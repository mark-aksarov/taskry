import { SignInPage } from "./SignInPage";
import { signIn } from "@/lib/actions/auth/signIn";
import { verifyAuthPageSession } from "@/lib/utils/verifyAuthPageSession";

export default async function AppSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) {
  await verifyAuthPageSession();

  const { status } = await searchParams;

  return (
    <SignInPage
      signIn={signIn}
      resetPasswordSuccess={status === "reset-password-success"}
    />
  );
}
