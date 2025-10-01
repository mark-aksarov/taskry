import { Select } from "@/components/ui/Select";
import { getProjectCategories } from "@/lib/queries/project";
import { Item } from "react-stately";

export async function ProjectCategorySelect() {
  const categories = await getProjectCategories(1);
  const itemClasses = "capitalize";

  if (!categories.length) {
    return null;
  }

  return (
    <Select
      label="Category"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={"all"}
      items={[{ id: "all", name: "All Categories" }, ...categories]}
    >
      {(item) => (
        <Item key={item.id} textValue={item.name}>
          <div className={itemClasses}>{item.name}</div>
        </Item>
      )}
    </Select>
  );
}
