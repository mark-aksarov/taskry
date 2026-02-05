import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

interface ProfilePageProps {
  profileDetailContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
  profileActions: React.ReactNode;
}

export function ProfilePage({
  profileDetailContainer,
  userHeaderContainer,
  profileActions,
}: ProfilePageProps) {
  const t = useTranslations("app.ProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        profileDetail={profileDetailContainer}
        profileHeader={userHeaderContainer}
        navigationDesktop={
          <ProfileNavigationDesktop profileActions={profileActions} />
        }
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ProfileNavigationMobile />
        </ToolbarMobileBottom>

        <div className="flex flex-col px-1.5">{userHeaderContainer}</div>
        <Card className="flex flex-col px-1.5">{profileActions}</Card>
        <Card className="flex flex-col">{profileDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
