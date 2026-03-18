import { Repeat } from "@/components/common/Repeat";
import { UserTaskListLayout } from "./UserTaskListLayout";
import { UserTaskListItemSkeleton } from "../UserTaskListItem";

interface UserTaskListSkeletonProps {
  className?: string;
  items: number;
}

export function UserTaskListSkeleton({
  className,
  items,
}: UserTaskListSkeletonProps) {
  return (
    <UserTaskListLayout className={className}>
      <Repeat items={items} renderItem={() => <UserTaskListItemSkeleton />} />
    </UserTaskListLayout>
  );
}
