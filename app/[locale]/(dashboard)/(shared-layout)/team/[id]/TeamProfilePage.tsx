import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { ProfileActions } from "@/components/users/ProfileActions";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationLarge } from "@/components/users/UserNavigationLarge";

interface TeamProfilePageProps {
  showUserActions: boolean;
  userId: string;
  userFullName: string;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function TeamProfilePage({
  showUserActions,
  userId,
  userFullName,
  userDetailContainer,
  userDetailHeaderContainer,
}: TeamProfilePageProps) {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        userDetailContainer={userDetailContainer}
        userDetailHeaderContainer={userDetailHeaderContainer}
        navigationLarge={
          <UserNavigationLarge
            userActions={
              showUserActions ? (
                <ProfileActions userId={userId} userFullName={userFullName} />
              ) : undefined
            }
          />
        }
      />

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/team" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <ToolbarMobile firstSlot={<UserNavigationMobile />} />

        <div className="flex flex-col">{userDetailHeaderContainer}</div>
        {showUserActions && (
          <Card className="flex flex-col p-1.5">
            <ProfileActions userId={userId} userFullName={userFullName} />
          </Card>
        )}
        <Card className="flex flex-col">{userDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
