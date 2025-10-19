import { Repeat } from "@/components/common/Repeat";
import { List } from "@/components/common/List";
import { ProjectListItem } from "@/components/projects/ProjectListItem";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { Skeleton } from "@/components/ui";
import { ProfilePageTabs } from "@/components/profile/ProfilePageTabs";

export default function Loading() {
  return (
    <PageGrid>
      <ToolbarDesktop>
        <ProfilePageTabs />
        <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Projects</ToolbarMobileHeading>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <ProfilePageTabs />
      </ToolbarMobileBottom>

      <List>
        <Repeat items={10} renderItem={() => <ProjectListItem />} />
      </List>
    </PageGrid>
  );
}
