import {
  ToolbarMobileTop,
  PageHeadingMobile,
  ToolbarMobileBottom,
} from "@/components/common/ToolbarOld";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { ProfileActionsSkeleton } from "@/components/users/ProfileActions";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

export default function AppTeamProfileLoading() {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        userDetailContainer={<UserDetailSkeleton />}
        userDetailHeaderContainer={<DetailHeaderSkeleton />}
        navigationDesktop={
          <UserNavigationDesktop userActions={<ProfileActionsSkeleton />} />
        }
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <BackButton href="/team" />
          <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <UserNavigationMobile />
        </ToolbarMobileBottom>

        <div className="flex flex-col">
          <DetailHeaderSkeleton />
        </div>
        <Card className="flex flex-col p-1.5">
          <ProfileActionsSkeleton />
        </Card>
        <Card className="flex flex-col">
          <UserDetailSkeleton />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
