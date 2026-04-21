"use client";

import { useTranslations } from "next-intl";
import NotFoundPageContainer from "@/dashboard/layout/NotFoundPageContainer";

export default function NotFound() {
  const t = useTranslations("app.NotFoundPage");

  return (
    <NotFoundPageContainer
      heading={t("heading")}
      description={t("description")}
      linkHref="/dashboard"
      linkLabel={t("toHome")}
    />
  );
}
