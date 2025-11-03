import {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardLeft,
  ProfileCardRight,
  ProfileCardTitle,
} from "@/components/profile/ProfileCard";
import { Suspense } from "react";
import {
  ProfileHeader,
  ProfileHeaderSkeleton,
} from "@/components/profile/ProfileHeader";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";
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
        <ProfileCard>
          <ProfileCardLeft>
            <ProfileCardHeader>
              <ProfileCardTitle>Assigned tasks</ProfileCardTitle>
            </ProfileCardHeader>
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
          </ProfileCardLeft>

          <ProfileCardRight>
            <Suspense fallback={<ProfileHeaderSkeleton />}>
              <ProfileHeader />
            </Suspense>
            <ProfileNavigationDesktop />
          </ProfileCardRight>
        </ProfileCard>
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
