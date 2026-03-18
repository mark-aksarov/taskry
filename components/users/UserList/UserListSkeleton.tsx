import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { UserListItemSkeleton } from "../UserListItem";

interface UserListSkeletonProps {
  className?: string;
  items: number;
}

export function UserListSkeleton({ className, items }: UserListSkeletonProps) {
  return (
    <List className={className}>
      <Repeat items={items} renderItem={() => <UserListItemSkeleton />} />
    </List>
  );
}
