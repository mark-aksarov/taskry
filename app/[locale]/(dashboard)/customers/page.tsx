import { CustomersPage } from "./CustomersPage";
import { getCustomers } from "@/lib/queries/customers";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { CustomersServerContainer } from "@/components/customer/CustomersServerContainer";
import { CustomerFiltersFormServerContainer } from "@/components/customer/CustomerFiltersFormServerContainer";

export default async function AppCustomersPage() {
  const workspaceId = await getUserWorkspaceId();
  const customers = await getCustomers(workspaceId);

  if (!customers.length) return <CustomersPageEmpty />;

  return (
    <CustomersPage
      CustomerFiltersFormContainer={CustomerFiltersFormServerContainer}
      CustomersServerContainer={CustomersServerContainer}
    />
  );
}
