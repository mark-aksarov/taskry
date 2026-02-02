import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { CustomerListItemSkeleton } from "@/components/customer/CustomerListItem";
import { useTranslations } from "next-intl";

export default function CustomersPageLoading() {
  const t = useTranslations("app.CustomersPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <CustomerListItemSkeleton />}
    />
  );
}
