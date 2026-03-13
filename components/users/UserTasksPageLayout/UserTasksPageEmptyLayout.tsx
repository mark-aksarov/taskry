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
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { TasksEmptySection } from "@/components/tasks/TasksEmptySection";

interface UserTasksPageEmptyLayoutProps {
  userDetailHeaderContainer: React.ReactNode;
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
  backButton?: boolean;
}

export function UserTasksPageEmptyLayout({
  userDetailHeaderContainer,
  navigationDesktop,
  navigationMobile,
  backButton,
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

            <div className="flex flex-auto items-center justify-center px-6">
              <TasksEmptySection headingClassName="md:text-3xl" />
            </div>
          </DetailCardLeft>

          <DetailCardRight>
            {userDetailHeaderContainer}
            {navigationDesktop}
          </DetailCardRight>
        </DetailCard>
      </PageContainer>

      <PageContainer fullscreen headerOffset className="md:hidden">
        <PageGrid className="relative flex-auto">
          <ToolbarMobileTop>
            {backButton && <BackButton href="/team" />}
            <ToolbarMobileHeading>{t("title")}</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <ToolbarMobileBottom>{navigationMobile}</ToolbarMobileBottom>

          <AbsoluteCenter className="w-full">
            <TasksEmptySection />
          </AbsoluteCenter>
        </PageGrid>
      </PageContainer>
    </>
  );
}
