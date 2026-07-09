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
import { getCompanyCount } from "@/lib/data/company/company.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateCompanyModal } from "@/dashboard/company/CreateCompanyModal";
import { CreateCustomerModal } from "@/dashboard/customer/CreateCustomerModal";
import { CustomerSearchModal } from "@/dashboard/customer/CustomerSearchModal";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { DeleteCustomersModal } from "@/dashboard/customer/DeleteCustomersModal";
import { CustomerFiltersModal } from "@/dashboard/customer/CustomerFiltersModal";
import { CreateCompanyProvider } from "@/dashboard/company/CreateCompanyProvider";
import { CustomerGridContainer } from "@/dashboard/customer/CustomerGridContainer";
import { CreateCustomerProvider } from "@/dashboard/customer/CreateCustomerProvider";
import { CustomerFiltersProvider } from "@/dashboard/customer/CustomerFiltersContext";
import { DeleteCustomersProvider } from "@/dashboard/customer/DeleteCustomersProvider";
import { CustomerCompanyFiltersModal } from "@/dashboard/customer/CustomerCompanyFiltersModal";
import { CreateCustomerFormContainer } from "@/dashboard/customer/CreateCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/dashboard/customer/CustomerFiltersFormContainer";
import { CustomerRouterSearchContainer } from "@/dashboard/customer/CustomerRouterSearchContainer";
import { CustomerCompanyFiltersFormContainer } from "@/dashboard/customer/CustomerCompanyFiltersFormContainer";

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

  // Show company filters only when companies exist
  const companyCount = await getCompanyCount();

  return (
    <SelectedItemsProvider pageItems={customers.map((c) => ({ id: c.id }))}>
      <DeleteCustomersProvider>
        <CreateCompanyProvider>
          <CreateCustomerProvider>
            <CustomerFiltersProvider filters={filters}>
              <CustomersPage
                page={page}
                pageSize={pageSize}
                totalCount={totalCount}
                companyCount={companyCount}
                totalFilteredCustomers={totalFilteredCustomers}
                selectedSortField={sort}
                // CustomerGrid is passed via props to allow mocking in Storybook stories
                customerGrid={<CustomerGridContainer customers={customers} />}
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
