"use client";

import { useTranslations } from "next-intl";
import NotFoundPageContainer from "@/dashboard/layout/NotFoundPageContainer";

export default function AppProjectDetailNotFound() {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <NotFoundPageContainer
      headerOffset
      heading={t("notFound.heading")}
      description={t("notFound.description")}
      linkHref="/projects"
      linkLabel={t("notFound.buttonLabel")}
    />
  );
}
