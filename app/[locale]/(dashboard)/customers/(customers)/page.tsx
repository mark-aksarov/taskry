import {
  dateSearchParam,
  pageSearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  searchParamToArray,
} from "@/lib/schemas/base";

import {
  getCustomerCount,
  getCustomerList,
} from "@/lib/data/customer/customer.dal";

import { z } from "zod";
import { CustomersPage } from "./CustomersPage";
import { customerSortFields } from "@/lib/types";
import { companyId } from "@/lib/schemas/company";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { NewCompanyForm } from "@/components/company/NewCompanyForm";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { CustomersContainer } from "@/components/customer/CustomersContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { NewCustomerFormContainer } from "@/components/customer/NewCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersFormContainer";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  sort: z.enum(customerSortFields).catch("fullName"),
  hasNoActiveProjects: booleanSearchParam,
  hasActiveProjects: booleanSearchParam,
  hasOverdueProjects: booleanSearchParam,
  company: z.preprocess(
    searchParamToArray,
    z.array(companyId).optional().catch(undefined),
  ),
});

export default async function AppCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort, ...filters } =
    searchParamsSchema.parse(rawParams);

  // Get total count of customers in the current workspace
  const totalCount = await getCustomerCount();
  const guestMode = await hasGuestRole();

  const customerToolbarCreateNewMenuTrigger = (
    <CustomerToolbarCreateNewMenuTrigger
      guestMode={guestMode}
      newCustomerFormContainer={<NewCustomerFormContainer />}
      newCompanyForm={<NewCompanyForm createCompany={createCompany} />}
    />
  );

  if (!totalCount) {
    return (
      <CustomersPageEmpty
        customerToolbarCreateNewMenuTrigger={
          customerToolbarCreateNewMenuTrigger
        }
      />
    );
  }

  // Get customers for the current page based on filters and sorting
  const { items: customers, totalCount: totalFilteredCustomers } =
    await getCustomerList({
      page,
      pageSize,
      sort,
      filters,
    });

  return (
    <SelectedItemsProvider pageItems={customers.map((c) => ({ id: c.id }))}>
      <PageTransitionProvider>
        <CustomersPage
          totalFilteredCustomers={totalFilteredCustomers}
          selectedSortField={sort}
          customerToolbarCreateNewMenuTrigger={
            customerToolbarCreateNewMenuTrigger
          }
          customerToolbarActionsMenuTrigger={
            <CustomerToolbarActionsMenuTrigger
              deleteCustomers={deleteCustomers}
            />
          }
          customerToolbarFiltersModalTrigger={
            <CustomerToolbarFiltersModalTrigger
              filtersFormContainer={
                <CustomerFiltersFormContainer filters={filters} />
              }
            />
          }
          customersContainer={
            <CustomersContainer
              customers={customers}
              totalCount={totalCount}
              page={page}
              pageSize={pageSize}
            />
          }
        />
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
