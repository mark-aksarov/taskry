"use client";

import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/dashboard/common/DetailCard";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { UserTaskListSkeleton } from "@/dashboard/users/UserTaskList";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";

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
  const t = useTranslations("dashboard.users.UserTasksPageLayout");

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
                {backButton && <BackButton fallbackHref="/team" />}
                <PageHeadingMobile>{t("title")}</PageHeadingMobile>
              </>
            }
            secondSlot={<ButtonSkeleton size="small" className="w-8" />}
          />
          <ToolbarMobile
            firstSlot={navigationMobile}
            secondSlot={<ButtonSkeleton ghost className="w-[7rem]" />}
          />

          <UserTaskListSkeleton items={10} />
        </PageGrid>
      </PageContainer>
    </>
  );
}
