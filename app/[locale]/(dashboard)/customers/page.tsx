import { CustomersPage } from "./CustomersPage";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { getPageParams } from "@/lib/utils/getPageParams";
import { getCustomerCount } from "@/lib/data/customers";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CustomersServerContainer } from "@/components/customer/CustomersServerContainer";
import { CustomerFiltersFormServerContainer } from "@/components/customer/CustomerFiltersFormServerContainer";

export default async function AppCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  await requireProtectedPage();

  const params = await searchParams;
  const { page, pageSize } = getPageParams(params);

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
