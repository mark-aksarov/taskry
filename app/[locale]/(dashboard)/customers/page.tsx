import { CustomersPage } from "./CustomersPage";
import { getCustomers } from "@/lib/queries/customers";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { CustomersServerContainer } from "@/components/customer/CustomersServerContainer";
import { CustomerFiltersFormServerContainer } from "@/components/customer/CustomerFiltersFormServerContainer";

export default async function AppCustomersPage() {
  const customers = await getCustomers(1);

  if (!customers.length) return <CustomersPageEmpty />;

  return (
    <CustomersPage
      CustomerFiltersFormContainer={CustomerFiltersFormServerContainer}
      CustomersServerContainer={CustomersServerContainer}
    />
  );
}
