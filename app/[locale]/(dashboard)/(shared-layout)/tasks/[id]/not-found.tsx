"use client";

import { useTranslations } from "next-intl";
import NotFoundPageContainer from "@/common/NotFoundPageContainer";

export default function AppTaskDetailNotFound() {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <NotFoundPageContainer
      headerOffset
      heading={t("notFound.heading")}
      description={t("notFound.description")}
      linkHref="/tasks"
      linkLabel={t("notFound.buttonLabel")}
    />
  );
}
