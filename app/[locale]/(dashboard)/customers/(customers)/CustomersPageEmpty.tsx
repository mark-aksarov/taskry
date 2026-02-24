import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";

interface CustomersPageEmptyProps {
  guestMode: boolean;
  createCompany: ActionFn<ActionState, FormData>;
  newCustomerFormContainer: React.ReactNode;
}

export function CustomersPageEmpty({
  guestMode,
  createCompany,
  newCustomerFormContainer,
}: CustomersPageEmptyProps) {
  const t = useTranslations("app.CustomersPageEmpty");

  const customerToolbarCreateNewMenuTrigger = (
    <CustomerToolbarCreateNewMenuTrigger
      guestMode={guestMode}
      newCustomerFormContainer={newCustomerFormContainer}
      createCompany={createCompany}
    />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={customerToolbarCreateNewMenuTrigger}
    />
  );
}
