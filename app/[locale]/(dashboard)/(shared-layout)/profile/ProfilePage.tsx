import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { EditUserModal } from "@/components/users/EditUserModal";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { ProfileActions } from "@/components/users/ProfileActions";
import { ChangePasswordModal } from "@/components/users/ChangePasswordModal";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

interface ProfilePageProps {
  userId: string;
  userFullName: string;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
  editUserFormContainer: React.ReactNode;
}

export function ProfilePage({
  userId,
  userFullName,
  userDetailContainer,
  userDetailHeaderContainer,
  editUserFormContainer,
}: ProfilePageProps) {
  const t = useTranslations("app.ProfilePage");

  return (
    <>
      <PageContainer>
        <UserDetailCard
          userDetailContainer={userDetailContainer}
          userDetailHeaderContainer={userDetailHeaderContainer}
          navigationDesktop={
            <ProfileNavigationDesktop
              profileActions={
                <ProfileActions userId={userId} userFullName={userFullName} />
              }
            />
          }
        />

        <PageGrid className="md:hidden">
          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ProfileNavigationMobile />
          </ToolbarMobileBottom>

          <div className="flex flex-col">{userDetailHeaderContainer}</div>
          <Card className="flex flex-col p-1.5">
            <ProfileActions userId={userId} userFullName={userFullName} />
          </Card>
          <Card className="flex flex-col">{userDetailContainer}</Card>
        </PageGrid>
      </PageContainer>

      <ChangePasswordModal userId={userId} />
      <EditUserModal editUserFormContainer={editUserFormContainer} />
    </>
  );
}
