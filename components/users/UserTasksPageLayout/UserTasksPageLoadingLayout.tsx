"use client";

import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/components/common/DetailCard";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ButtonSkeleton } from "@/components/ui/Skeleton";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { UserTaskListSkeleton } from "@/components/users/UserTaskList";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { TaskGridMobileSkeleton } from "@/components/tasks/TaskGrid";

interface UserTasksPageLoadingLayoutProps {
  navigationLarge: React.ReactNode;
  navigationMobile: React.ReactNode;
  backButton?: boolean;
}

export function UserTasksPageLoadingLayout({
  navigationLarge,
  navigationMobile,
  backButton,
}: UserTasksPageLoadingLayoutProps) {
  const t = useTranslations("users.UserTasksPageLayout");

  return (
    <>
      <PageContainer className="max-md:hidden">
        <DetailCard>
          <DetailCardLeft>
            <DetailCardHeader>
              <DetailCardTitle>{t("title")}</DetailCardTitle>
              <div className="flex gap-4">
                <ButtonSkeleton size="small" className="w-[5rem]" />
                <ButtonSkeleton size="small" className="w-8" />
                <ButtonSkeleton size="small" className="w-8" />
              </div>
            </DetailCardHeader>

            <UserTaskListSkeleton items={10} />
          </DetailCardLeft>

          <DetailCardRight>
            <DetailHeaderSkeleton />
            {navigationLarge}
          </DetailCardRight>
        </DetailCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobile
            firstSlot={
              <>
                {backButton && <BackButton href="/team" />}
                <PageHeadingMobile>{t("title")}</PageHeadingMobile>
              </>
            }
            secondSlot={<ButtonSkeleton size="small" className="w-8" />}
          />
          <ToolbarMobile
            firstSlot={navigationMobile}
            secondSlot={<ButtonSkeleton ghost className="w-[7rem]" />}
          />

          <TaskGridMobileSkeleton items={10} />
        </PageGrid>
      </PageContainer>
    </>
  );
}
