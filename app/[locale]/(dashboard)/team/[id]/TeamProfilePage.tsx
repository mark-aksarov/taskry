import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

interface TeamProfilePageProps {
  userActions: React.ReactNode;
  profileDetailContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
}

export function TeamProfilePage({
  userActions,
  profileDetailContainer,
  userHeaderContainer,
}: TeamProfilePageProps) {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <PageContainer>
      <UserDetailCard
        profileDetail={profileDetailContainer}
        profileHeader={userHeaderContainer}
        navigationDesktop={<UserNavigationDesktop userActions={userActions} />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <BackButton />
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <UserNavigationMobile />
        </ToolbarMobileBottom>

        <div className="flex flex-col px-1.5">{userHeaderContainer}</div>
        {userActions && (
          <Card className="flex flex-col px-1.5">{userActions}</Card>
        )}
        <Card className="flex flex-col">{profileDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
