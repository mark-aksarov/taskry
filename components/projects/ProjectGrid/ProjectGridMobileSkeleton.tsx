import { Repeat } from "@/components/common/Repeat";
import { GridMobile } from "@/components/common/Grid";
import { ProjectGridItemMobileSkeleton } from "../ProjectGridItem";

interface ProjectGridMobileSkeletonProps {
  className?: string;
  items: number;
}

export function ProjectGridMobileSkeleton({
  className,
  items,
}: ProjectGridMobileSkeletonProps) {
  return (
    <GridMobile className={className}>
      <Repeat
        items={items}
        renderItem={() => <ProjectGridItemMobileSkeleton />}
      />
    </GridMobile>
  );
}
