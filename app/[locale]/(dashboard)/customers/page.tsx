import { z } from "zod";
import { CustomersPage } from "./CustomersPage";
import { arrayParam } from "@/lib/utils/arrayParam";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deleteCustomers } from "@/lib/actions/company/deleteCustomers";
import { CustomersServerContainer } from "@/components/customer/CustomersServerContainer";
import { NewCustomerFormServerContainer } from "@/components/customer/NewCustomerFormServerContainer";
import { EditCustomerFormClientContainer } from "@/components/customer/EditCustomerFormClientContainer";
import { CustomerFiltersFormServerContainer } from "@/components/customer/CustomerFiltersFormServerContainer";
import { EditCustomerFormClientContainerProvider } from "@/components/customer/EditCustomerFormClientContainerContext";

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
  searchParams: Promise<{ page?: string; pageSize?: string; sort?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort, ...filters } =
    searchParamsSchema.parse(rawParams);

  // Get count
  const count = await getCustomerCount();

  if (!count) return <CustomersPageEmpty />;

  return (
    <EditCustomerFormClientContainerProvider
      value={EditCustomerFormClientContainer}
    >
      <CustomersPage
        page={page}
        pageSize={pageSize}
        sort={sort}
        filters={filters}
        createCompanyAction={createCompany}
        CustomerFiltersFormContainer={CustomerFiltersFormServerContainer}
        CustomersServerContainer={CustomersServerContainer}
        NewCustomerFormContainer={NewCustomerFormServerContainer}
        deleteCustomersAction={deleteCustomers}
      />
    </EditCustomerFormClientContainerProvider>
  );
}
