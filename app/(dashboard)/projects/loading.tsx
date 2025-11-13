import { PageGrid } from "@/components/common/PageGrid";
import { Skeleton } from "@/components/ui";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { Repeat } from "@/components/common/Repeat";
import { List } from "@/components/common/List";
import { ProjectListItemSkeleton } from "@/components/projects/ProjectListItem";
import { PageContainer } from "@/components/common/PageContainer";

export default function Loading() {
  return (
    <PageContainer>
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

        <List>
          <Repeat items={10} renderItem={() => <ProjectListItemSkeleton />} />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
