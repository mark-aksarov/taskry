import { getCustomers } from "@/lib/queries/customers";
import { Select } from "../ui/Select";
import { Item } from "react-stately";

export async function CustomerSelect() {
  const customers = await getCustomers(1);
  const itemClasses = "capitalize";

  if (!customers.length) {
    return null;
  }

  return (
    <Select
      label="Customer"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={"all"}
      items={[{ id: "all", fullName: "All Customers" }, ...customers]}
    >
      {(item) => (
        <Item key={item.id} textValue={item.fullName}>
          <div className={itemClasses}>{item.fullName}</div>
        </Item>
      )}
    </Select>
  );
}
