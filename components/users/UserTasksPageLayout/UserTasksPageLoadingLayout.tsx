"use client";

import {
  UserCard,
  UserCardLeft,
  UserCardRight,
  UserCardTitle,
  UserCardHeader,
} from "@/components/users/UserCard";

import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/Skeleton";
import { Repeat } from "@/components/common/Repeat";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { UserTaskListLayout } from "@/components/users/UserTaskList";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { UserTaskListItemSkeleton } from "@/components/users/UserTaskListItem";

interface UserTasksPageLoadingLayoutProps {
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
}

export function UserTasksPageLoadingLayout({
  navigationDesktop,
  navigationMobile,
}: UserTasksPageLoadingLayoutProps) {
  const t = useTranslations("users.UserTasksPageLayout");

  return (
    <>
      <PageContainer className="max-md:hidden">
        <UserCard>
          <UserCardLeft>
            <UserCardHeader>
              <UserCardTitle>{t("title")}</UserCardTitle>
              <div className="flex gap-4">
                <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
                <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
              </div>
            </UserCardHeader>
            <UserTaskListLayout>
              <Repeat
                items={10}
                renderItem={() => <UserTaskListItemSkeleton />}
              />
            </UserTaskListLayout>
          </UserCardLeft>

          <UserCardRight>
            <PersonHeaderSkeleton />
            {navigationDesktop}
          </UserCardRight>
        </UserCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
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
