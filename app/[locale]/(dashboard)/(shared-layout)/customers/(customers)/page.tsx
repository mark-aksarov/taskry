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
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateCompanyModal } from "@/components/company/CreateCompanyModal";
import { CustomersContainer } from "@/components/customer/CustomersContainer";
import { CreateCustomerModal } from "@/components/customer/CreateCustomerModal";
import { CustomerSearchModal } from "@/components/customer/CustomerSearchModal";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { DeleteCustomersModal } from "@/components/customer/DeleteCustomersModal";
import { CustomerFiltersModal } from "@/components/customer/CustomerFiltersModal";
import { CreateCompanyProvider } from "@/components/company/CreateCompanyProvider";
import { CreateCustomerProvider } from "@/components/customer/CreateCustomerProvider";
import { CustomerFiltersProvider } from "@/components/customer/CustomerFiltersContext";
import { DeleteCustomersProvider } from "@/components/customer/DeleteCustomersProvider";
import { CustomerCompanyFiltersModal } from "@/components/customer/CustomerCompanyFiltersModal";
import { CreateCustomerFormContainer } from "@/components/customer/CreateCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersFormContainer";
import { CustomerRouterSearchContainer } from "@/components/customer/CustomerRouterSearchContainer";
import { CustomerCompanyFiltersFormContainer } from "@/components/customer/CustomerCompanyFiltersFormContainer";

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
      <DeleteCustomersProvider>
        <CreateCompanyProvider>
          <CreateCustomerProvider>
            <CustomerFiltersProvider filters={filters}>
              <CustomersPage
                totalCount={totalCount}
                totalFilteredCustomers={totalFilteredCustomers}
                selectedSortField={sort}
                customersContainer={
                  <CustomersContainer
                    customers={customers}
                    totalCount={totalFilteredCustomers}
                    page={page}
                    pageSize={pageSize}
                  />
                }
              />

              <CustomerSearchModal
                searchContainer={<CustomerRouterSearchContainer />}
              />
              <CreateCustomerModal
                createCustomerFormContainer={<CreateCustomerFormContainer />}
              />
              <CreateCompanyModal />
              <CustomerFiltersModal
                filtersFormContainer={<CustomerFiltersFormContainer />}
              />
              <CustomerCompanyFiltersModal
                filtersFormContainer={<CustomerCompanyFiltersFormContainer />}
              />
              <DeleteCustomersModal />
            </CustomerFiltersProvider>
          </CreateCustomerProvider>
        </CreateCompanyProvider>
      </DeleteCustomersProvider>
    </SelectedItemsProvider>
  );
}
