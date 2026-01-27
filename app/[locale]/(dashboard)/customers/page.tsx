import {
  dateSearchParam,
  pageSearchParam,
  arraySearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
} from "@/lib/schemas/base";

import { z } from "zod";
import { CustomersPage } from "./CustomersPage";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { NewCompanyForm } from "@/components/customer/NewCompanyForm";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { CustomersContainer } from "@/components/customer/CustomersContainer";
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
  sort: z.enum(["fullName", "company"]).catch("fullName"),
  hasNoActiveProjects: booleanSearchParam,
  hasActiveProjects: booleanSearchParam,
  hasOverdueProjects: booleanSearchParam,
  company: arraySearchParam(z.coerce.number()),
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

  // Get count
  const count = await getCustomerCount();

  if (!count) {
    return (
      <CustomersPageEmpty
        newCustomerFormContainer={<NewCustomerFormContainer />}
      />
    );
  }

  return (
    <CustomersPage
      customerToolbarCreateNewMenuTrigger={
        <CustomerToolbarCreateNewMenuTrigger
          newCustomerFormContainer={<NewCustomerFormContainer />}
          newCompanyForm={<NewCompanyForm formAction={createCompany} />}
        />
      }
      customerToolbarActionsMenuTrigger={
        <CustomerToolbarActionsMenuTrigger deleteAction={deleteCustomers} />
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
          page={page}
          pageSize={pageSize}
          sort={sort}
          filters={filters}
        />
      }
    />
  );
}
