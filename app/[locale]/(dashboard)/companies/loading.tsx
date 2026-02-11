import { useTranslations } from "next-intl";
import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { CompanyListItemSkeleton } from "@/components/company/CompanyListItem";

export default function CompaniesPageLoading() {
  const t = useTranslations("app.CompaniesPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <CompanyListItemSkeleton />}
    />
  );
}
