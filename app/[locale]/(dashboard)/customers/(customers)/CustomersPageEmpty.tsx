import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface CustomersPageEmptyProps {
  customerToolbarCreateNewMenuTrigger: React.ReactNode;
}

export function CustomersPageEmpty({
  customerToolbarCreateNewMenuTrigger,
}: CustomersPageEmptyProps) {
  const t = useTranslations("app.CustomersPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={customerToolbarCreateNewMenuTrigger}
    />
  );
}
