"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import ErrorPageContainer from "@/dashboard/layout/ErrorPageContainer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("app.ErrorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageContainer
      reset={reset}
      heading={t("heading")}
      description={t("description")}
      resetButtonLabel={t("buttonLabel")}
    />
  );
}
