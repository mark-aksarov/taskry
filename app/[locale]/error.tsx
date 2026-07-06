"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import ErrorSection from "@/common/ErrorSection";

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
    <div className="flex h-dvh items-center justify-center">
      <ErrorSection
        reset={reset}
        heading={t("heading")}
        description={t("description")}
        resetButtonLabel={t("buttonLabel")}
      />
    </div>
  );
}
