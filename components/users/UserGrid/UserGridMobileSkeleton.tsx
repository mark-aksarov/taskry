import { Repeat } from "@/components/common/Repeat";
import { GridMobile } from "@/components/common/Grid";
import { UserGridItemMobileSkeleton } from "../UserGridItem";

interface UserGridMobileSkeletonProps {
  className?: string;
  items: number;
}

export function UserGridMobileSkeleton({
  className,
  items,
}: UserGridMobileSkeletonProps) {
  return (
    <GridMobile className={className}>
      <Repeat items={items} renderItem={() => <UserGridItemMobileSkeleton />} />
    </GridMobile>
  );
}
