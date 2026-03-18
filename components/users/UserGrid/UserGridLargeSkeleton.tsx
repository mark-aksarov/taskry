import { Repeat } from "@/components/common/Repeat";
import { GridLarge } from "@/components/common/Grid";
import { UserGridItemLargeSkeleton } from "../UserGridItem";

interface UserGridLargeSkeletonProps {
  className?: string;
  items: number;
}

export function UserGridLargeSkeleton({
  className,
  items,
}: UserGridLargeSkeletonProps) {
  return (
    <GridLarge className={className}>
      <Repeat items={items} renderItem={() => <UserGridItemLargeSkeleton />} />
    </GridLarge>
  );
}
