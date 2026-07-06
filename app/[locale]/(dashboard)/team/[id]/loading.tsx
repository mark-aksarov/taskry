import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { UserDetailCard } from "@/dashboard/users/UserDetailCard";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { UserDetailAltSkeleton } from "@/dashboard/users/UserDetailAlt";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ProfileActionsSkeleton } from "@/dashboard/users/ProfileActions";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { UserNavigationLargeSkeleton } from "@/dashboard/users/UserNavigationLarge";
import { UserNavigationMobileSkeleton } from "@/dashboard/users/UserNavigationMobile";

export default function AppTeamProfileLoading() {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <DashboardContainer>
      <UserDetailCard
        userDetailContainer={<UserDetailAltSkeleton />}
        userDetailHeaderContainer={<DetailHeaderSkeleton />}
        navigationLarge={<UserNavigationLargeSkeleton />}
      />

      <DashboardGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/team" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
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
      </DashboardGrid>
    </DashboardContainer>
  );
}
