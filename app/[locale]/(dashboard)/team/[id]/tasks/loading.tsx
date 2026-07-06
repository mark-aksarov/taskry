"use client";

import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/dashboard/common/DetailCard";

import { useTranslations } from "next-intl";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { UserTaskListSkeleton } from "@/dashboard/users/UserTaskList";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { UserNavigationLargeSkeleton } from "@/dashboard/users/UserNavigationLarge";
import { UserNavigationMobileSkeleton } from "@/dashboard/users/UserNavigationMobile";

export default function AppProfileTasksPageLoading() {
  const t = useTranslations("app.TeamProfileTaskPage");

  return (
    <>
      <DashboardContainer className="max-md:hidden">
        <DetailCard>
          <DetailCardLeft>
            <DetailCardHeader>
              <DetailCardTitle>{t("heading")}</DetailCardTitle>
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
            <UserNavigationLargeSkeleton />
          </DetailCardRight>
        </DetailCard>
      </DashboardContainer>

      <DashboardContainer className="md:hidden">
        <DashboardGrid>
          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/team" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={<ButtonSkeleton size="small" className="w-8" />}
          />
          <ToolbarMobile
            firstSlot={<UserNavigationMobileSkeleton />}
            secondSlot={<ButtonSkeleton ghost className="w-[7rem]" />}
          />

          <UserTaskListSkeleton items={10} />
        </DashboardGrid>
      </DashboardContainer>
    </>
  );
}
