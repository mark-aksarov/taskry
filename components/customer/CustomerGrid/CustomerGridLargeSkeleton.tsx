import { Repeat } from "@/components/common/Repeat";
import { GridLarge } from "@/components/common/Grid";
import { CustomerGridItemLargeSkeleton } from "../CustomerGridItem";

interface CustomerGridLargeSkeletonProps {
  className?: string;
  items: number;
}

export function CustomerGridLargeSkeleton({
  className,
  items,
}: CustomerGridLargeSkeletonProps) {
  return (
    <GridLarge className={className}>
      <Repeat
        items={items}
        renderItem={() => <CustomerGridItemLargeSkeleton />}
      />
    </GridLarge>
  );
}
