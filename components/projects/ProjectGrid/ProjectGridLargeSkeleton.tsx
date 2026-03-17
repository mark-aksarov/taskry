import { Repeat } from "@/components/common/Repeat";
import { GridLarge } from "@/components/common/Grid";
import { ProjectGridItemLargeSkeleton } from "../ProjectGridItem";

interface ProjectGridLargeSkeletonProps {
  className?: string;
  items: number;
}

export function ProjectGridLargeSkeleton({
  className,
  items,
}: ProjectGridLargeSkeletonProps) {
  return (
    <GridLarge className={className}>
      <Repeat
        items={items}
        renderItem={() => <ProjectGridItemLargeSkeleton />}
      />
    </GridLarge>
  );
}
