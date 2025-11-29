import { SignInPageError } from "./SignInPageError";

export default function ErrorPage({
  error,
  reset,
  searchParams,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  searchParams: { [key: string]: string };
}) {
  const { email } = searchParams;

  return <SignInPageError error={error} email={email} />;
}
