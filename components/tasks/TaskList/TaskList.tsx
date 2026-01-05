import { List } from "@/components/common/List";

interface TaskListProps {
  children: React.ReactNode;
}

export function TaskList({ children }: TaskListProps) {
  return <List data-test="tasks-list">{children}</List>;
}
