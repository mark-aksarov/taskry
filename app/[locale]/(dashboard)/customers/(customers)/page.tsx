import {
  dateSearchParam,
  pageSearchParam,
  arraySearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  coercedPositiveInt,
} from "@/lib/schemas/base";

import { z } from "zod";
import { CustomersPage } from "./CustomersPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { NewCompanyForm } from "@/components/company/NewCompanyForm";
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
  company: arraySearchParam(coercedPositiveInt),
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

  const guestMode = await hasGuestRole();

  const customerToolbarCreateNewMenuTrigger = (
    <CustomerToolbarCreateNewMenuTrigger
      guestMode={guestMode}
      newCustomerFormContainer={<NewCustomerFormContainer />}
      newCompanyForm={<NewCompanyForm createCompany={createCompany} />}
    />
  );

  if (!count) {
    return (
      <CustomersPageEmpty
        customerToolbarCreateNewMenuTrigger={
          customerToolbarCreateNewMenuTrigger
        }
      />
    );
  }

  return (
    <CustomersPage
      customerToolbarCreateNewMenuTrigger={customerToolbarCreateNewMenuTrigger}
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
