"use client";

import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/components/common/DetailCard";

import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/Skeleton";
import { Repeat } from "@/components/common/Repeat";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { UserTaskListLayout } from "@/components/users/UserTaskList";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { UserTaskListItemSkeleton } from "@/components/users/UserTaskListItem";

interface UserTasksPageLoadingLayoutProps {
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
  backButton?: boolean;
}

export function UserTasksPageLoadingLayout({
  navigationDesktop,
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
                <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
                <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
              </div>
            </DetailCardHeader>
            <UserTaskListLayout>
              <Repeat
                items={10}
                renderItem={() => <UserTaskListItemSkeleton />}
              />
            </UserTaskListLayout>
          </DetailCardLeft>

          <DetailCardRight>
            <DetailHeaderSkeleton />
            {navigationDesktop}
          </DetailCardRight>
        </DetailCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            {backButton && <BackButton />}
            <ToolbarMobileHeading>{t("title")}</ToolbarMobileHeading>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>{navigationMobile}</ToolbarMobileBottom>

          <UserTaskListLayout>
            <Repeat
              items={10}
              renderItem={() => <UserTaskListItemSkeleton />}
            />
          </UserTaskListLayout>
        </PageGrid>
      </PageContainer>
    </>
  );
}
