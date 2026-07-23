import { useTranslations } from "next-intl";
import NotFoundSection from "@/common/NotFoundSection";
import ErrorDashboardContainer from "@/dashboard/layout/ErrorDashboardContainer";

export default function AppClientDetailNotFound() {
  const t = useTranslations("app.ClientDetailPage");

  return (
    <ErrorDashboardContainer headerOffset>
      <NotFoundSection
        heading={t("notFound.heading")}
        description={t("notFound.description")}
        linkHref="/clients"
        linkLabel={t("notFound.buttonLabel")}
      />
    </ErrorDashboardContainer>
  );
}
