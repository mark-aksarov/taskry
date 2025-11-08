import { Grid } from "@/components/common/Grid/Grid";
import { CustomerGridItem, CustomerGridItemType } from "../CustomerGridItem";

export function CustomerGrid({
  customers,
}: {
  customers: CustomerGridItemType[];
}) {
  return (
    <Grid>
      {customers.map((customer) => (
        <CustomerGridItem key={customer.id} customer={customer} />
      ))}
    </Grid>
  );
}
