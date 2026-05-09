"use client";

import { useTranslations } from "next-intl";
import NotFoundPageContainer from "@/common/NotFoundPageContainer";

export default function AppTeamProfileNotFound() {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <NotFoundPageContainer
      headerOffset
      heading={t("notFound.heading")}
      description={t("notFound.description")}
      linkHref="/team"
      linkLabel={t("notFound.buttonLabel")}
    />
  );
}
