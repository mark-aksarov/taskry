import { List } from "@/components/common/List";

interface ProjectListProps {
  children: React.ReactNode;
}

export function ProjectList({ children }: ProjectListProps) {
  return <List>{children}</List>;
}
