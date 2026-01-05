import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewCompanyForm } from "@/components/customer/NewCompanyForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarSortingMenuTrigger } from "@/components/customer/CustomerToolbarSortingMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";

interface CustomersPageProps {
  customersFiltersForm: React.ReactNode;
  customersContainer: React.ReactNode;
  newCustomerFormContainer: React.ReactNode;
  createCompanyAction: ActionFn<ActionState, FormData>;
  deleteCustomersAction: ActionFn<ActionState, DeleteCustomersPayload>;
}

export function CustomersPage({
  customersFiltersForm,
  customersContainer,
  newCustomerFormContainer,
  createCompanyAction,
  deleteCustomersAction,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <CustomerToolbarSortingMenuTrigger />
              <CustomerToolbarFiltersModalTrigger
                filtersForm={customersFiltersForm}
              />
              <CustomerToolbarActionsMenuTrigger
                deleteAction={deleteCustomersAction}
              />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <CustomerToolbarCreateNewMenuTrigger
                newCustomerForm={newCustomerFormContainer}
                newCompanyForm={
                  <NewCompanyForm formAction={createCompanyAction} />
                }
              />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <CustomerToolbarSortingMenuTrigger />
              <CustomerToolbarFiltersModalTrigger
                filtersForm={customersFiltersForm}
              />
              <CustomerToolbarActionsMenuTrigger
                deleteAction={deleteCustomersAction}
              />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <CustomerToolbarCreateNewMenuTrigger
                newCustomerForm={newCustomerFormContainer}
                newCompanyForm={
                  <NewCompanyForm formAction={createCompanyAction} />
                }
              />
            </ToolbarMobileBottom>
            {customersContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
