import { ProfileTaskList } from "../ProfileTaskList";
import { PageContainer } from "@/components/common/PageContainer";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import {
  ProfileTaskListItem,
  ProfileTaskListItemType,
} from "../ProfileTaskListItem";

export function ProfileTasksMobile({
  tasks,
}: {
  tasks?: ProfileTaskListItemType[];
}) {
  return (
    <PageContainer className="md:hidden">
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
        </ToolbarMobileTop>
        {!tasks ? (
          <List>
            <Repeat items={10} renderItem={() => <ProfileTaskListItem />} />
          </List>
        ) : (
          <ProfileTaskList tasks={tasks} className="md:hidden" />
        )}
      </PageGrid>
    </PageContainer>
  );
}
