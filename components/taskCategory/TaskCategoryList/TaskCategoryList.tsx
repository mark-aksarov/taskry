import { List } from "@/components/common/List";

export function TaskCategoryList({ children }: { children: React.ReactNode }) {
  return <List data-test="task-categories-list">{children}</List>;
}
