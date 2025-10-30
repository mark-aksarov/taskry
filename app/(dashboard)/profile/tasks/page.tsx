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
import { ProfileTasksDesktop } from "@/components/profile/ProfileTasksDesktop";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { ProfileTaskListItem } from "@/components/profile/ProfileTaskListItem";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileTasksMobile } from "@/components/profile/ProfileTasksMobile";

export default async function ProfileTasksPage() {
  return (
    <>
      <PageContainer className="max-md:hidden">
        <DetailCard>
          <DetailCardLeft>
            <DetailCardHeader>
              <DetailCardTitle>Assigned tasks</DetailCardTitle>
            </DetailCardHeader>
            <Suspense
              fallback={
                <List className="gap-0 px-6">
                  <Repeat
                    items={10}
                    renderItem={() => <ProfileTaskListItem />}
                  />
                </List>
              }
            >
              <ProfileTasksDesktop />
            </Suspense>
          </DetailCardLeft>

          <DetailPanel>
            <Suspense fallback={<ProfileDetailPanelHeaderSkeleton />}>
              <ProfileDetailPanelHeader />
            </Suspense>
            <ProfileDetailNavigation />
          </DetailPanel>
        </DetailCard>
      </PageContainer>

      <Suspense
        fallback={
          <PageContainer className="md:hidden">
            <PageGrid>
              <ToolbarMobileTop>
                <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
              </ToolbarMobileTop>
              <List>
                <Repeat items={10} renderItem={() => <ProfileTaskListItem />} />
              </List>
            </PageGrid>
          </PageContainer>
        }
      >
        <ProfileTasksMobile />
      </Suspense>
    </>
  );
}
