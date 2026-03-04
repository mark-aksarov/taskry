"use client";

import { useEffect } from "react";
import ErrorPageLayout from "@/components/layout/ErrorPageLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPageLayout reset={reset} />;
}
