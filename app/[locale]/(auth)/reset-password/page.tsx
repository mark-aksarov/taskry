import { use } from "react";
import { notFound } from "next/navigation";
import { ResetPasswordPage } from "./ResetPasswordPage";

export default function AppResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = use(searchParams);

  if (!token) {
    notFound();
  }

  return <ResetPasswordPage token={token} />;
}
