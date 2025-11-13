import { CustomerList } from "../CustomerList";
import { CustomerGrid } from "../CustomerGrid";
import { getCustomers } from "@/lib/queries/customers";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { CustomerListItem } from "../CustomerListItem";

export async function CustomerViewModeContainer() {
  const customers = await getCustomers(1);

  return (
    <ViewModeContainer
      list={
        <CustomerList>
          {customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              id={customer.id}
              fullName={customer.fullName}
              imageUrl={customer.imageUrl}
              email={customer.email}
              phoneNumber={customer.phoneNumber}
              publicLink={customer.publicLink}
              company={customer.company}
            />
          ))}
        </CustomerList>
      }
      grid={<CustomerGrid customers={customers} />}
    />
  );
}
