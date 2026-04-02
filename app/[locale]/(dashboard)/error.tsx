"use client";

import { useTranslations } from "next-intl";
import ErrorPageContainer from "@/components/layout/ErrorPageContainer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("app.ErrorPage");

  return (
    <ErrorPageContainer
      reset={reset}
      heading={t("heading")}
      description={t("description")}
      resetButtonLabel={t("buttonLabel")}
    />
  );
}
