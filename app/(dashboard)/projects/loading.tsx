import { Skeleton } from "@/components/ui";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ListSkeleton } from "@/components/common/ListSkeleton";
import { ProjectItem } from "@/components/projects/ProjectItem";

export default function Loading() {
  return (
    <PageGrid>
      <ToolbarDesktop>
        <Skeleton className="h-8 w-[5rem] rounded-lg" />
        <Skeleton className="h-8 w-[5rem] rounded-lg" />
        <Skeleton className="ml-auto h-8 w-[5rem] rounded-lg" />
        <Skeleton className="h-8 w-[5rem] rounded-lg" />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Projects</ToolbarMobileHeading>
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <Skeleton className="h-8 w-[5rem] rounded-lg" />
        <Skeleton className="ml-auto h-8 w-[5rem] rounded-lg" />
      </ToolbarMobileBottom>
      <ListSkeleton items={10} renderItem={() => <ProjectItem />} />
    </PageGrid>
  );
}
