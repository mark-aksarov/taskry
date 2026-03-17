import { Repeat } from "@/components/common/Repeat";
import { GridMobile } from "@/components/common/Grid";
import { CustomerGridItemMobileSkeleton } from "../CustomerGridItem";

interface CustomerGridMobileSkeletonProps {
  className?: string;
  items: number;
}

export function CustomerGridMobileSkeleton({
  className,
  items,
}: CustomerGridMobileSkeletonProps) {
  return (
    <GridMobile className={className}>
      <Repeat
        items={items}
        renderItem={() => <CustomerGridItemMobileSkeleton />}
      />
    </GridMobile>
  );
}
