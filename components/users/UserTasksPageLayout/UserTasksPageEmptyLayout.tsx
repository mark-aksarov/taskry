import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/components/common/DetailCard";

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
        <DetailCard>
          <DetailCardLeft>
            <DetailCardHeader>
              <DetailCardTitle>{t("title")}</DetailCardTitle>
            </DetailCardHeader>

            <UserTasksEmptySection
              newTaskFormContainer={newTaskFormContainer}
            />
          </DetailCardLeft>

          <DetailCardRight>
            {userHeaderContainer}
            {navigationDesktop}
          </DetailCardRight>
        </DetailCard>
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
