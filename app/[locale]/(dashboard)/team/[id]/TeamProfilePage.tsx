import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { EditUserModal } from "@/components/users/EditUserModal";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { ProfileActions } from "@/components/users/ProfileActions";
import { ChangePasswordModal } from "@/components/users/ChangePasswordModal";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

interface TeamProfilePageProps {
  showUserActions: boolean;
  userId: string;
  userFullName: string;
  profileDetailContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
  editUserFormContainer: React.ReactNode;
}

export function TeamProfilePage({
  showUserActions,
  userId,
  userFullName,
  profileDetailContainer,
  userHeaderContainer,
  editUserFormContainer,
}: TeamProfilePageProps) {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <>
      <PageContainer>
        <UserDetailCard
          profileDetail={profileDetailContainer}
          profileHeader={userHeaderContainer}
          navigationDesktop={
            <UserNavigationDesktop
              userActions={
                showUserActions && (
                  <ProfileActions userId={userId} userFullName={userFullName} />
                )
              }
            />
          }
        />

        <PageGrid className="md:hidden">
          <ToolbarMobileTop>
            <BackButton href="/team" />
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <UserNavigationMobile />
          </ToolbarMobileBottom>

          <div className="flex flex-col">{userHeaderContainer}</div>
          {showUserActions && (
            <Card className="flex flex-col p-1.5">
              <ProfileActions userId={userId} userFullName={userFullName} />
            </Card>
          )}
          <Card className="flex flex-col">{profileDetailContainer}</Card>
        </PageGrid>
      </PageContainer>

      <ChangePasswordModal userId={userId} />
      <EditUserModal editUserFormContainer={editUserFormContainer} />
    </>
  );
}
