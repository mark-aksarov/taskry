import { useEffect, useRef } from "react";
import { ErrorBanner } from "@/common/ErrorBanner";
import { ActionStatus } from "@/lib/actions/types";

interface FormErrorBannerProps {
  status: ActionStatus;
  isPending: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormErrorBanner({
  status,
  isPending,
  children,
  className,
}: FormErrorBannerProps) {
  if (status !== "error" || isPending) return null;

  return (
    <FormErrorBannerInner className={className}>
      {children}
    </FormErrorBannerInner>
  );
}

function FormErrorBannerInner({
  className,
  children,
}: Pick<FormErrorBannerProps, "children" | "className">) {
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <ErrorBanner className={className} ref={errorRef}>
      {children}
    </ErrorBanner>
  );
}
