import { Item } from "react-stately";
import { getProjectCategories } from "@/lib/queries/project";
import { ResponsiveSelect } from "../common/ResponsiveSelect";

export async function ProjectStatusSelect() {
  const categories = await getProjectCategories(1);

  if (!categories.length) {
    return null;
  }

  return (
    <ResponsiveSelect
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
    </ResponsiveSelect>
  );
}
