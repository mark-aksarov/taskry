import {
  GridItem,
  GridItemRow,
  GridItemInfoSkeleton,
  GridItemProgressSkeleton,
} from "@/components/common/Grid";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export const TaskGridItemSkeleton = () => {
  return (
    <GridItem>
      <GridItemRow>
        <MenuTriggerSkeleton className="-mr-2 ml-auto" />
      </GridItemRow>

      <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-4">
        <GridItemInfoSkeleton className="max-sm:w-full max-sm:items-center" />
        <ImageContainerSkeleton className="h-9 w-9" />
      </div>

      <GridItemProgressSkeleton />
    </GridItem>
  );
};
