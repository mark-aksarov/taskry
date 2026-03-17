import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { ProjectListItemSkeleton } from "../ProjectListItem";

interface ProjectListSkeletonProps {
  className?: string;
  items: number;
}

export function ProjectListSkeleton({
  className,
  items,
}: ProjectListSkeletonProps) {
  return (
    <List className={className}>
      <Repeat items={items} renderItem={() => <ProjectListItemSkeleton />} />
    </List>
  );
}
