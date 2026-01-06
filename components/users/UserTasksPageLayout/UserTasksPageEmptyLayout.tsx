import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  UserCard,
  UserCardLeft,
  UserCardRight,
  UserCardTitle,
  UserCardHeader,
} from "@/components/users/UserCard";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { UserTasksEmptySection } from "@/components/users/UserTasksEmptySection";

interface UserTasksPageEmptyLayoutProps {
  newTaskFormContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
}

export function UserTasksPageEmptyLayout({
  newTaskFormContainer,
  userHeaderContainer,
  navigationDesktop,
  navigationMobile,
}: UserTasksPageEmptyLayoutProps) {
  const t = useTranslations("users.UserTasksPageEmptyLayout");

  return (
    <>
      <PageContainer className="max-md:hidden">
        <UserCard>
          <UserCardLeft>
            <UserCardHeader>
              <UserCardTitle>{t("title")}</UserCardTitle>
            </UserCardHeader>

            <UserTasksEmptySection
              newTaskFormContainer={newTaskFormContainer}
            />
          </UserCardLeft>

          <UserCardRight>
            {userHeaderContainer}
            {navigationDesktop}
          </UserCardRight>
        </UserCard>
      </PageContainer>

      <PageContainer fullscreen className="md:hidden">
        <PageGrid className="flex-auto">
          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("title")}</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <ToolbarMobileBottom>{navigationMobile}</ToolbarMobileBottom>

          <UserTasksEmptySection newTaskFormContainer={newTaskFormContainer} />
        </PageGrid>
      </PageContainer>
    </>
  );
}
