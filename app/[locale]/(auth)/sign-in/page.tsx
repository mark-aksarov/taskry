import { SignInPage } from "./SignInPage";
import { signIn } from "@/lib/actions/auth/signIn";
import { requireAuthPage } from "@/lib/utils/requireAuthPage";

export default async function AppSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) {
  await requireAuthPage();

  const { status } = await searchParams;

  return (
    <SignInPage
      signIn={signIn}
      resetPasswordSuccess={status === "reset-password-success"}
    />
  );
}
