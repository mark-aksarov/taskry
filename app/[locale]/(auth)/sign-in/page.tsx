import { SignInPage } from "./SignInPage";
import { signIn } from "@/lib/actions/auth/signIn";
import { requireAuthPageSession } from "@/lib/utils/requireAuthPageSession";

export default async function AppSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) {
  await requireAuthPageSession();

  const { status } = await searchParams;

  return (
    <SignInPage
      signIn={signIn}
      resetPasswordSuccess={status === "reset-password-success"}
    />
  );
}
