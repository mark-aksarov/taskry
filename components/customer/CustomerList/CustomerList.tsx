import { CustomerListItem } from "../CustomerListItem";
import { List } from "@/components/common/List";
import { CustomerPreview } from "@/lib/queries/types";

export function CustomerList({ customers }: { customers: CustomerPreview[] }) {
  return (
    <List>
      {customers.map((customer) => (
        <CustomerListItem key={customer.id} customer={customer} />
      ))}
    </List>
  );
}
