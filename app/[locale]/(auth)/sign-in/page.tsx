import { SignInPage } from "./SignInPage";
import { redirectIfAuthenticated } from "@/lib/utils/redirectIfAuthenticated";

export default async function AppSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) {
  await redirectIfAuthenticated();

  const { status } = await searchParams;

  return (
    <SignInPage resetPasswordSuccess={status === "reset-password-success"} />
  );
}
