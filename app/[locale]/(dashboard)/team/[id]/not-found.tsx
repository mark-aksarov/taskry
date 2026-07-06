import { useTranslations } from "next-intl";
import NotFoundSection from "@/common/NotFoundSection";
import ErrorDashboardContainer from "@/dashboard/layout/ErrorDashboardContainer";

export default function AppTeamProfileNotFound() {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <ErrorDashboardContainer headerOffset>
      <NotFoundSection
        heading={t("notFound.heading")}
        description={t("notFound.description")}
        linkHref="/customers"
        linkLabel={t("notFound.buttonLabel")}
      />
    </ErrorDashboardContainer>
  );
}
