import { useEffect, useRef } from "react";
import { ErrorBanner } from "@/common/ErrorBanner";
import { ActionStatus } from "@/lib/actions/types";

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

  return <FormErrorBannerInner>{children}</FormErrorBannerInner>;
}

function FormErrorBannerInner({
  children,
}: Pick<FormErrorBannerProps, "children">) {
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return <ErrorBanner ref={errorRef}>{children}</ErrorBanner>;
}
