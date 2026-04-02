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
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { TasksEmptySection } from "@/components/tasks/TasksEmptySection";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";

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
