import { ActionStatus } from "@/lib/actions/types";
import { ErrorBanner } from "./ErrorBanner";

interface FormErrorBannerProps {
  status: ActionStatus;
  isPending: boolean;
  children: React.ReactNode;
}

export function FormErrorBanner({
  status,
  isPending,
  children,
}: FormErrorBannerProps) {
  if (status !== "error" || isPending) return null;

  return <ErrorBanner>{children}</ErrorBanner>;
}
