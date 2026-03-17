import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { CustomerListItemSkeleton } from "../CustomerListItem";

interface CustomerListSkeletonProps {
  className?: string;
  items: number;
}

export function CustomerListSkeleton({
  className,
  items,
}: CustomerListSkeletonProps) {
  return (
    <List className={className}>
      <Repeat items={items} renderItem={() => <CustomerListItemSkeleton />} />
    </List>
  );
}
