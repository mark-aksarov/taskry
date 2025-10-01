import { Item } from "react-stately";
import { Select } from "@/components/ui/Select";
import { getProjectCategories } from "@/lib/queries/project";

export async function ProjectStatusSelect() {
  const categories = await getProjectCategories(1);

  if (!categories.length) {
    return null;
  }

  return (
    <Select
      label="Status"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={"all"}
    >
      <Item textValue="all statuses" key="all">
        All Statuses
      </Item>
      <Item textValue="pending" key="pending">
        Pending
      </Item>
      <Item textValue="active" key="active">
        Active
      </Item>
      <Item textValue="completed" key="completed">
        Completed
      </Item>
    </Select>
  );
}
