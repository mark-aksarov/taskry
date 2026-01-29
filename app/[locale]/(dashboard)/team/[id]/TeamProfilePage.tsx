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
import { ProfileActions } from "@/components/users/ProfileActions";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

interface TeamProfilePageProps {
  profileDetailContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
}

export function TeamProfilePage({
  profileDetailContainer,
  userHeaderContainer,
}: TeamProfilePageProps) {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        profileDetail={profileDetailContainer}
        profileHeader={userHeaderContainer}
        navigationDesktop={<UserNavigationDesktop />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <UserNavigationMobile />
        </ToolbarMobileBottom>

        <div className="flex flex-col px-1.5">{userHeaderContainer}</div>

        <Card className="flex flex-col px-1.5">
          <ProfileActions />
        </Card>

        <Card className="flex flex-col">{profileDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
