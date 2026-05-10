import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { UserDetailCard } from "@/dashboard/users/UserDetailCard";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { UserDetailAltSkeleton } from "@/dashboard/users/UserDetailAlt";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ProfileActionsSkeleton } from "@/dashboard/users/ProfileActions";
import { UserNavigationLargeSkeleton } from "@/dashboard/users/UserNavigationLarge";
import { UserNavigationMobileSkeleton } from "@/dashboard/users/UserNavigationMobile";

export default function AppTeamProfileLoading() {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        userDetailContainer={<UserDetailAltSkeleton />}
        userDetailHeaderContainer={<DetailHeaderSkeleton />}
        navigationLarge={<UserNavigationLargeSkeleton />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
        />

        <ToolbarMobile firstSlot={<UserNavigationMobileSkeleton />} />

        <div>
          <DetailHeaderSkeleton />
        </div>
        <Card className="p-1.5">
          <ProfileActionsSkeleton />
        </Card>
        <Card>
          <UserDetailAltSkeleton />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
