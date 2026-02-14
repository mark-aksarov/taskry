import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface CompaniesPageEmptyProps {
  companyToolbarCreateNewModalTrigger: React.ReactNode;
}

export function CompaniesPageEmpty({
  companyToolbarCreateNewModalTrigger,
}: CompaniesPageEmptyProps) {
  const t = useTranslations("app.CompaniesPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={companyToolbarCreateNewModalTrigger}
    />
  );
}
