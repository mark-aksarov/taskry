import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { UserDetailCard } from "@/dashboard/users/UserDetailCard";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { UserNavigationMobile } from "@/dashboard/users/UserNavigationMobile";
import { UserNavigationLarge } from "@/dashboard/users/UserNavigationLarge";

interface TeamProfilePageProps {
  showUserActions: boolean;
  userId: string;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function TeamProfilePage({
  showUserActions,
  userId,
  userDetailContainer,
  userDetailHeaderContainer,
}: TeamProfilePageProps) {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <DashboardContainer>
      <UserDetailCard
        userDetailContainer={userDetailContainer}
        userDetailHeaderContainer={userDetailHeaderContainer}
        navigationLarge={
          <UserNavigationLarge
            userActions={
              showUserActions ? <ProfileActions userId={userId} /> : undefined
            }
          />
        }
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

        <ToolbarMobile firstSlot={<UserNavigationMobile />} />

        <div>{userDetailHeaderContainer}</div>
        {showUserActions && (
          <Card className="p-1.5">
            <ProfileActions userId={userId} />
          </Card>
        )}
        <Card>{userDetailContainer}</Card>
      </DashboardGrid>
    </DashboardContainer>
  );
}
