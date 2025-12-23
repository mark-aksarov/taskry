import { z } from "zod";
import { CustomersPage } from "./CustomersPage";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CustomersServerContainer } from "@/components/customer/CustomersServerContainer";
import { CustomerFiltersFormServerContainer } from "@/components/customer/CustomerFiltersFormServerContainer";

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
    <CustomersPage
      page={page}
      pageSize={pageSize}
      CustomerFiltersFormContainer={CustomerFiltersFormServerContainer}
      CustomersServerContainer={CustomersServerContainer}
    />
  );
}
