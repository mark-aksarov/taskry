import { z } from "zod";
import { Suspense } from "react";
import { CustomersPage } from "./CustomersPage";
import { arrayParam } from "@/lib/utils/arrayParam";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { NewCompanyForm } from "@/components/customer/NewCompanyForm";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { CustomersContainer } from "@/components/customer/CustomersContainer";
import { CustomerFormBaseSkeleton } from "@/components/customer/CustomerFormBase";
import { CustomerFiltersFormSkeleton } from "@/components/customer/CustomerFiltersForm";
import { NewCustomerFormContainer } from "@/components/customer/NewCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersFormContainer";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["fullName", "company"]).catch("fullName"),
  hasNoActiveProjects: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  hasActiveProjects: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  hasOverdueProjects: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  company: arrayParam(z.coerce.number()).catch([]),
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
          newCustomerFormContainer={
            <Suspense fallback={<CustomerFormBaseSkeleton />}>
              <NewCustomerFormContainer />
            </Suspense>
          }
          newCompanyForm={<NewCompanyForm formAction={createCompany} />}
        />
      }
      customerToolbarActionsMenuTrigger={
        <CustomerToolbarActionsMenuTrigger deleteAction={deleteCustomers} />
      }
      customerToolbarFiltersModalTrigger={
        <CustomerToolbarFiltersModalTrigger
          filtersFormContainer={
            <Suspense fallback={<CustomerFiltersFormSkeleton />}>
              <CustomerFiltersFormContainer filters={filters} />
            </Suspense>
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
