import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface CompaniesPageEmptyProps {
  companyToolbarCreateNewButton: React.ReactNode;
}

export function CompaniesPageEmpty({
  companyToolbarCreateNewButton,
}: CompaniesPageEmptyProps) {
  const t = useTranslations("app.CompaniesPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={companyToolbarCreateNewButton}
    />
  );
}
