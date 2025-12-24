import { z } from "zod";
import { CustomersPage } from "./CustomersPage";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CustomersServerContainer } from "@/components/customer/CustomersServerContainer";
import { NewCustomerFormServerContainer } from "@/components/customer/NewCustomerFormServerContainer";
import { EditCustomerFormClientContainer } from "@/components/customer/EditCustomerFormClientContainer";
import { CustomerFiltersFormServerContainer } from "@/components/customer/CustomerFiltersFormServerContainer";
import { EditCustomerFormClientContainerProvider } from "@/components/customer/EditCustomerFormClientContainerContext";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
});

export default async function AppCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize } = searchParamsSchema.parse(rawParams);

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
        createCompanyAction={createCompany}
        CustomerFiltersFormContainer={CustomerFiltersFormServerContainer}
        CustomersServerContainer={CustomersServerContainer}
        NewCustomerFormContainer={NewCustomerFormServerContainer}
      />
    </EditCustomerFormClientContainerProvider>
  );
}
