import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { UserDetailCard } from "@/dashboard/users/UserDetailCard";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ProfileNavigationLarge } from "@/dashboard/users/ProfileNavigationLarge";
import { ProfileNavigationMobile } from "@/dashboard/users/ProfileNavigationMobile";

interface ProfilePageProps {
  userId: string;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function ProfilePage({
  userId,
  userDetailContainer,
  userDetailHeaderContainer,
}: ProfilePageProps) {
  const t = useTranslations("app.ProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        userDetailContainer={userDetailContainer}
        userDetailHeaderContainer={userDetailHeaderContainer}
        navigationLarge={
          <ProfileNavigationLarge
            profileActions={<ProfileActions userId={userId} />}
          />
        }
      />

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
        />

        <ToolbarMobile firstSlot={<ProfileNavigationMobile />} />

        <div>{userDetailHeaderContainer}</div>
        <Card className="p-1.5">
          <ProfileActions userId={userId} />
        </Card>
        <Card>{userDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
