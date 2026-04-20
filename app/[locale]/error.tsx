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
      heading={t("heading")}
      description={t("description")}
      reset={reset}
      resetButtonLabel={t("buttonLabel")}
    />
  );
}
