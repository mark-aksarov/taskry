"use client";

import { useTranslations } from "next-intl";
import NotFoundPageContainer from "@/common/NotFoundPageContainer";

export default function AppCustomerDetailNotFound() {
  const t = useTranslations("app.CustomerDetailPage");

  return (
    <NotFoundPageContainer
      headerOffset
      heading={t("notFound.heading")}
      description={t("notFound.description")}
      linkHref="/customers"
      linkLabel={t("notFound.buttonLabel")}
    />
  );
}
