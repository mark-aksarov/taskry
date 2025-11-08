import { List } from "@/components/common/List";
import { CustomerListItem, CustomerListItemType } from "../CustomerListItem";

export function CustomerList({
  customers,
}: {
  customers: CustomerListItemType[];
}) {
  return (
    <List>
      {customers.map((customer) => (
        <CustomerListItem key={customer.id} customer={customer} />
      ))}
    </List>
  );
}
