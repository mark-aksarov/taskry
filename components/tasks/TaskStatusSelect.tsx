import { Item } from "react-stately";
import { ResponsiveSelect } from "../common/ResponsiveSelect";

export function TaskStatusSelect() {
  return (
    <ResponsiveSelect
      label="Status"
      placeholder="Select status"
      overlayClassName="w-[var(--trigger-width)]"
    >
      <Item key="pending">Pending</Item>
      <Item key="active">Active</Item>
      <Item key="completed">Completed</Item>
    </ResponsiveSelect>
  );
}
