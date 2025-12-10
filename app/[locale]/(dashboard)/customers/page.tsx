import { CustomersPage } from "./CustomersPage";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { getPageParams } from "@/lib/utils/getPageParams";
import { getCustomerCount } from "@/lib/queries/customers";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { CustomersServerContainer } from "@/components/customer/CustomersServerContainer";
import { CustomerFiltersFormServerContainer } from "@/components/customer/CustomerFiltersFormServerContainer";

export default async function AppCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const params = await searchParams;
  const { page, pageSize } = getPageParams(params);

  const workspaceId = await getUserWorkspaceId();
  const count = await getCustomerCount({ workspaceId });

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
