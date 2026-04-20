import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/dashboard/common/DetailCard";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { TasksEmptySection } from "@/dashboard/tasks/TasksEmptySection";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";

interface UserTasksPageEmptyLayoutProps {
  userDetailHeaderContainer: React.ReactNode;
  navigationLarge: React.ReactNode;
  navigationMobile: React.ReactNode;
  backButton?: boolean;
}

export function UserTasksPageEmptyLayout({
  userDetailHeaderContainer,
  navigationLarge,
  navigationMobile,
  backButton,
}: UserTasksPageEmptyLayoutProps) {
  const t = useTranslations("dashboard.users.UserTasksPageEmptyLayout");

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
            {navigationLarge}
          </DetailCardRight>
        </DetailCard>
      </PageContainer>

      <PageContainer fullscreen headerOffset className="md:hidden">
        <PageGrid className="relative flex-auto">
          <ToolbarMobile
            firstSlot={
              <>
                {backButton && <BackButton fallbackHref="/team" />}
                <PageHeadingMobile>{t("title")}</PageHeadingMobile>
              </>
            }
          />
          <ToolbarMobile firstSlot={navigationMobile} />

          <AbsoluteCenter className="w-full">
            <TasksEmptySection />
          </AbsoluteCenter>
        </PageGrid>
      </PageContainer>
    </>
  );
}
