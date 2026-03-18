import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { EditUserModal } from "@/components/users/EditUserModal";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { ProfileActions } from "@/components/users/ProfileActions";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ChangePasswordModal } from "@/components/users/ChangePasswordModal";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationLarge } from "@/components/users/ProfileNavigationLarge";

interface ProfilePageProps {
  userId: string;
  userFullName: string;
  searchContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
  editUserFormContainer: React.ReactNode;
}

export function ProfilePage({
  userId,
  userFullName,
  searchContainer,
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
          navigationLarge={
            <ProfileNavigationLarge
              profileActions={
                <ProfileActions userId={userId} userFullName={userFullName} />
              }
            />
          }
        />

        <PageGrid className="md:hidden">
          <ToolbarMobile
            firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
          />

          <ToolbarMobile firstSlot={<ProfileNavigationMobile />} />

          <div className="flex flex-col">{userDetailHeaderContainer}</div>
          <Card className="flex flex-col p-1.5">
            <ProfileActions userId={userId} userFullName={userFullName} />
          </Card>
          <Card className="flex flex-col">{userDetailContainer}</Card>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
      <ChangePasswordModal userId={userId} />
      <EditUserModal editUserFormContainer={editUserFormContainer} />
    </>
  );
}
