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
import { createCompany } from "@/lib/actions/company/createCompany";
import { createCustomer } from "@/lib/actions/customer/createCustomer";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { CustomersContainer } from "@/components/customer/CustomersContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreateCompanyProvider } from "@/components/company/CreateCompanyContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { CreateCustomerProvider } from "@/components/customer/CreateCustomerContext";
import { DeleteCustomersProvider } from "@/components/customer/DeleteCustomersContext";
import { NewCustomerFormContainer } from "@/components/customer/NewCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersFormContainer";

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

  // Render the empty page if there are no customers (without applying filters)
  const totalCount = await getCustomerCount();

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
        <DeleteCustomersProvider deleteCustomers={deleteCustomers}>
          <CreateCompanyProvider createCompany={createCompany}>
            <CreateCustomerProvider createCustomer={createCustomer}>
              <CustomersPage
                totalCount={totalCount}
                totalFilteredCustomers={totalFilteredCustomers}
                selectedSortField={sort}
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
            </CreateCustomerProvider>
          </CreateCompanyProvider>
        </DeleteCustomersProvider>
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
