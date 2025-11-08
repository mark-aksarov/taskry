import { CustomerList } from "../CustomerList";
import { CustomerGrid } from "../CustomerGrid";
import { getCustomers } from "@/lib/queries/customers";
import { ViewModeContainer } from "@/components/common/ViewMode";

export async function CustomerViewModeContainer() {
  const customers = await getCustomers(1);

  return (
    <ViewModeContainer
      list={<CustomerList customers={customers} />}
      grid={<CustomerGrid customers={customers} />}
    />
  );
}
