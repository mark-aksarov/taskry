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
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

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

        <Card>
          <PersonDetailPresentation
            personHeader={userHeaderContainer}
            userDetail={profileDetailContainer}
          />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
