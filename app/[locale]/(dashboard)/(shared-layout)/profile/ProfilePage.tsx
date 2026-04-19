import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { ProfileActions } from "@/components/users/ProfileActions";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ProfileNavigationLarge } from "@/components/users/ProfileNavigationLarge";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";

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
