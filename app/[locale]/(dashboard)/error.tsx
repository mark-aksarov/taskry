"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import ErrorPageLayout from "@/components/layout/ErrorPageLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("app.DashboardErrorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPageLayout />;
}
