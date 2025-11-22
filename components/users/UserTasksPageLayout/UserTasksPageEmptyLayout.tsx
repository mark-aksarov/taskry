import {
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";

import {
  UserCard,
  UserCardHeader,
  UserCardLeft,
  UserCardRight,
  UserCardTitle,
} from "@/components/users/UserCard";

import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { UserTasksEmptySection } from "@/components/users/UserTasksEmptySection";

interface UserTasksPageEmptyLayoutProps {
  userId: string;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
}

export function UserTasksPageEmptyLayout({
  userId,
  UserHeaderContainer,
  navigationDesktop,
  navigationMobile,
}: UserTasksPageEmptyLayoutProps) {
  return (
    <>
      <PageContainer className="max-md:hidden">
        <UserCard>
          <UserCardLeft>
            <UserCardHeader>
              <UserCardTitle>Assigned tasks</UserCardTitle>
            </UserCardHeader>

            <UserTasksEmptySection />
          </UserCardLeft>

          <UserCardRight>
            <UserHeaderContainer userId={userId} />
            {navigationDesktop}
          </UserCardRight>
        </UserCard>
      </PageContainer>

      <PageContainer fullscreen className="md:hidden">
        <PageGrid className="flex-auto">
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <ToolbarMobileBottom>{navigationMobile}</ToolbarMobileBottom>

          <UserTasksEmptySection />
        </PageGrid>
      </PageContainer>
    </>
  );
}
