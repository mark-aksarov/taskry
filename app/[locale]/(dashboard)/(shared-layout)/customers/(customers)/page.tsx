import {
  dateSearchParam,
  pageSearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  searchParamToArray,
  searchQueryParam,
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
import { CreateCompanyProvider } from "@/components/company/CreateCompanyProvider";
import { CreateCustomerProvider } from "@/components/customer/CreateCustomerContext";
import { DeleteCustomersProvider } from "@/components/customer/DeleteCustomersContext";
import { CustomerFiltersProvider } from "@/components/customer/CustomerFiltersContext";
import { NewCustomerFormContainer } from "@/components/customer/NewCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersFormContainer";
import { CustomerRouterSearchContainer } from "@/components/customer/CustomerRouterSearchContainer";
import { CustomerCompanyFiltersFormContainer } from "@/components/customer/CustomerCompanyFiltersFormContainer";
import { CreateCompanyModalProvider } from "@/components/company/CreateCompanyModal";

const searchParamsSchema = z.object({
  query: searchQueryParam,
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  sort: z.enum(customerSortFields).catch("fullName"),
  hasNoActiveProjects: booleanSearchParam,
  hasActiveProjects: booleanSearchParam,
  hasOverdueProjects: booleanSearchParam,
  companyIds: z.preprocess(
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
      <DeleteCustomersProvider deleteCustomers={deleteCustomers}>
        <CreateCompanyModalProvider>
          <CreateCompanyProvider>
            <CreateCustomerProvider createCustomer={createCustomer}>
              <CustomerFiltersProvider filters={filters}>
                <CustomersPage
                  totalCount={totalCount}
                  totalFilteredCustomers={totalFilteredCustomers}
                  selectedSortField={sort}
                  searchContainer={<CustomerRouterSearchContainer />}
                  filtersFormContainer={<CustomerFiltersFormContainer />}
                  customerCompanyFiltersFormContainer={
                    <CustomerCompanyFiltersFormContainer />
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
              </CustomerFiltersProvider>
            </CreateCustomerProvider>
          </CreateCompanyProvider>
        </CreateCompanyModalProvider>
      </DeleteCustomersProvider>
    </SelectedItemsProvider>
  );
}
