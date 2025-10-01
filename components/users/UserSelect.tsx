import { Item } from "react-stately";
import { getUsers } from "@/lib/queries/user";
import { ResponsiveSelect } from "../common/ResponsiveSelect";

export async function UserSelect() {
  const users = await getUsers(1);
  const itemClasses = "capitalize";

  if (!users.length) {
    return null;
  }

  return (
    <ResponsiveSelect
      label="Creator"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={"all"}
      items={[{ id: "all", name: "All Users" }, ...users]}
    >
      {(item) => (
        <Item key={item.id} textValue={item.name}>
          <div className={itemClasses}>{item.name}</div>
        </Item>
      )}
    </ResponsiveSelect>
  );
}
