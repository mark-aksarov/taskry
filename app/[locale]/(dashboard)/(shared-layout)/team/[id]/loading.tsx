import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ProfileActionsSkeleton } from "@/components/users/ProfileActions";
import { UserNavigationLarge } from "@/components/users/UserNavigationLarge";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";

export default function AppTeamProfileLoading() {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        userDetailContainer={<UserDetailSkeleton />}
        userDetailHeaderContainer={<DetailHeaderSkeleton />}
        navigationLarge={
          <UserNavigationLarge userActions={<ProfileActionsSkeleton />} />
        }
      />

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
        />

        <ToolbarMobile firstSlot={<ProfileNavigationMobile />} />

        <div>
          <DetailHeaderSkeleton />
        </div>
        <Card className="p-1.5">
          <ProfileActionsSkeleton />
        </Card>
        <Card>
          <UserDetailSkeleton />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
