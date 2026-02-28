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
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { CustomersContainer } from "@/components/customer/CustomersContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { NewCustomerFormContainer } from "@/components/customer/NewCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersFormContainer";
import { DeleteCustomersProvider } from "@/components/customer/DeleteCustomersContext";

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
  const session = await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort, ...filters } =
    searchParamsSchema.parse(rawParams);

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  // Render the empty page if there are no customers (without applying filters)
  const totalCount = await getCustomerCount();

  if (!totalCount) {
    return (
      <CurrentUserProvider value={currentUserContextValue}>
        <CustomersPageEmpty
          createCompany={createCompany}
          newCustomerFormContainer={<NewCustomerFormContainer />}
        />
      </CurrentUserProvider>
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
    <CurrentUserProvider value={currentUserContextValue}>
      <SelectedItemsProvider pageItems={customers.map((c) => ({ id: c.id }))}>
        <PageTransitionProvider>
          <DeleteCustomersProvider>
            <CustomersPage
              totalFilteredCustomers={totalFilteredCustomers}
              selectedSortField={sort}
              createCompany={createCompany}
              deleteCustomers={deleteCustomers}
              filtersFormContainer={
                <CustomerFiltersFormContainer filters={filters} />
              }
              newCustomerFormContainer={<NewCustomerFormContainer />}
              customersContainer={
                <CustomersContainer
                  customers={customers}
                  totalCount={totalCount}
                  page={page}
                  pageSize={pageSize}
                />
              }
            />
          </DeleteCustomersProvider>
        </PageTransitionProvider>
      </SelectedItemsProvider>
    </CurrentUserProvider>
  );
}
