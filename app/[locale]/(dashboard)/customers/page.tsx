import { z } from "zod";
import { Suspense } from "react";
import { CustomersPage } from "./CustomersPage";
import { arrayParam } from "@/lib/utils/arrayParam";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { CustomersContainer } from "@/components/customer/CustomersContainer";
import { CustomerFiltersFormSkeleton } from "@/components/customer/CustomerFiltersForm";
import { NewCustomerFormContainer } from "@/components/customer/NewCustomerFormContainer";
import { EditCustomerFormContainer } from "@/components/customer/EditCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersFormContainer";
import { EditCustomerFormContainerProvider } from "@/components/customer/EditCustomerFormContainerContext";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(5),
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
    <EditCustomerFormContainerProvider value={EditCustomerFormContainer}>
      <CustomersPage
        customersFiltersForm={
          <Suspense fallback={<CustomerFiltersFormSkeleton />}>
            <CustomerFiltersFormContainer filters={filters} />
          </Suspense>
        }
        customersContainer={
          <CustomersContainer
            page={page}
            pageSize={pageSize}
            sort={sort}
            filters={filters}
          />
        }
        newCustomerFormContainer={<NewCustomerFormContainer />}
        createCompanyAction={createCompany}
        deleteCustomersAction={deleteCustomers}
      />
    </EditCustomerFormContainerProvider>
  );
}
