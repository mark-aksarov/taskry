import { List } from "@/components/common/List";

export function ProjectCategoryList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <List data-test="project-categories-list">{children}</List>;
}
