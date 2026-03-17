import {
  ToolbarMobileTop,
  PageHeadingMobile,
  ToolbarMobileBottom,
} from "@/components/common/ToolbarOld";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { ProfileActionsSkeleton } from "@/components/users/ProfileActions";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

export default function AppProfileLoading() {
  const t = useTranslations("app.ProfilePage");

  return (
    <>
      <PageContainer>
        <UserDetailCard
          userDetailContainer={<UserDetailSkeleton />}
          userDetailHeaderContainer={<DetailHeaderSkeleton />}
          navigationDesktop={
            <ProfileNavigationDesktop
              profileActions={<ProfileActionsSkeleton />}
            />
          }
        />

        <PageGrid className="md:hidden">
          <ToolbarMobileTop>
            <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ProfileNavigationMobile />
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
    </>
  );
}
