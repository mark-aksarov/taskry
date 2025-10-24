import {
  DetailCard,
  DetailCardHeader,
  DetailCardLeft,
  DetailCardTitle,
} from "@/components/common/Detail";
import { Suspense } from "react";
import { DetailPanel } from "@/components/common/DetailPanel";
import {
  ProfileDetailPanelHeader,
  ProfileDetailPanelHeaderSkeleton,
} from "@/components/profile/ProfileDetailPanelHeader";
import { ProfileDetailNavigation } from "@/components/profile/ProfileDetailNavigation";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProfileTasks } from "@/components/profile/ProfileTasks";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { ProfileTaskListItem } from "@/components/profile/ProfileTaskListItem";

export default async function ProfileTasksPage() {
  return (
    <>
      <DetailCard className="max-md:hidden">
        <DetailCardLeft>
          <DetailCardHeader>
            <DetailCardTitle>Assigned tasks</DetailCardTitle>
          </DetailCardHeader>
          <Suspense
            fallback={
              <List className="gap-0">
                <Repeat items={10} renderItem={() => <ProfileTaskListItem />} />
              </List>
            }
          >
            <ProfileTasks />
          </Suspense>
        </DetailCardLeft>

        <DetailPanel>
          <Suspense fallback={<ProfileDetailPanelHeaderSkeleton />}>
            <ProfileDetailPanelHeader />
          </Suspense>
          <ProfileDetailNavigation />
        </DetailPanel>
      </DetailCard>

      <div className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <Suspense
            fallback={
              <List className="gap-0">
                <Repeat items={10} renderItem={() => <ProfileTaskListItem />} />
              </List>
            }
          >
            <ProfileTasks />
          </Suspense>
        </PageGrid>
      </div>
    </>
  );
}
