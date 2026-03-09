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
      heading={t("heading")}
      description={t("description")}
      reset={reset}
      resetButtonLabel={t("buttonLabel")}
      emptySectionClassName="max-w-[500px]"
    />
  );
}
