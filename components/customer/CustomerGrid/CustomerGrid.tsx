import { CustomerGridItem } from "../CustomerGridItem";
import { CustomerPreview } from "@/lib/queries/types";
import { Grid } from "@/components/common/Grid/Grid";

export function CustomerGrid({ customers }: { customers: CustomerPreview[] }) {
  return (
    <Grid>
      {customers.map((customer) => (
        <CustomerGridItem key={customer.id} customer={customer} />
      ))}
    </Grid>
  );
}
