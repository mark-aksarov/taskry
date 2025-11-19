import { CustomerList } from "../CustomerList";
import { CustomerGrid } from "../CustomerGrid";
import { getCustomers } from "@/lib/queries/customers";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { CustomerListItem } from "../CustomerListItem";
import { CustomerGridItem } from "../CustomerGridItem";

export async function CustomersServerContainer() {
  const customers = await getCustomers(1);

  return (
    <ViewModeLayout
      list={
        <CustomerList>
          {customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              id={customer.id}
              fullName={customer.fullName}
              imageUrl={customer.imageUrl ?? undefined}
              email={customer.email}
              phoneNumber={customer.phoneNumber ?? undefined}
              publicLink={customer.publicLink ?? undefined}
              company={customer.company}
            />
          ))}
        </CustomerList>
      }
      grid={
        <CustomerGrid>
          {customers.map((customer) => (
            <CustomerGridItem
              key={customer.id}
              id={customer.id}
              fullName={customer.fullName}
              imageUrl={customer.imageUrl ?? undefined}
              email={customer.email}
              phoneNumber={customer.phoneNumber ?? undefined}
              publicLink={customer.publicLink ?? undefined}
              company={customer.company}
            />
          ))}
        </CustomerGrid>
      }
    />
  );
}
