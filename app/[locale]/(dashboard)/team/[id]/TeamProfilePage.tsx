import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

interface TeamProfilePageProps {
  userId: string;
  UserDetailContainer: React.ComponentType<{ userId: string }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function TeamProfilePage({
  userId,
  UserDetailContainer,
  UserHeaderContainer,
}: TeamProfilePageProps) {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        profileDetail={
          <Suspense fallback={<UserDetailSkeleton />}>
            <UserDetailContainer userId={userId} />
          </Suspense>
        }
        profileHeader={
          <Suspense fallback={<PersonHeaderSkeleton />}>
            <UserHeaderContainer userId={userId} />
          </Suspense>
        }
        navigationDesktop={<UserNavigationDesktop />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <UserNavigationMobile />
        </ToolbarMobileBottom>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<PersonHeaderSkeleton />}>
            <UserHeaderContainer userId={userId} />
          </Suspense>
          <Suspense fallback={<UserDetailSkeleton />}>
            <UserDetailContainer userId={userId} />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
