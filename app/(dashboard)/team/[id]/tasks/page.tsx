import { getTaskList } from "@/lib/queries/task";
import { ProfileTasksPage } from "@/app/(dashboard)/profile/tasks/ProfileTasksPage";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { UserProfileNavigationMobile } from "@/components/users/UserProfileNavigationMobile";
import { ProfileTasksPageEmpty } from "@/app/(dashboard)/profile/tasks/ProfileTasksPageEmpty";
import { UserProfileNavigationDesktop } from "@/components/users/UserProfileNavigationDesktop";
import { ProfileTasksServerContainer } from "@/components/profile/ProfileTasksServerContainer";
import { ProfileHeaderServerContainer } from "@/components/profile/ProfileHeaderServerContainer";

export default async function AppProfileTasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tasks = await getTaskList(id);

  if (!tasks.length)
    return (
      <ProfileTasksPageEmpty
        userId={id}
        ProfileHeaderContainer={ProfileHeaderServerContainer}
        profileNavigationDesktop={<UserProfileNavigationDesktop />}
        profileNavigationMobile={<UserProfileNavigationMobile />}
      />
    );

  return (
    <ProfileTasksPage
      userId={id}
      ProfileTasksContainer={ProfileTasksServerContainer}
      ProfileHeaderContainer={ProfileHeaderServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
      profileNavigationDesktop={<UserProfileNavigationDesktop />}
      profileNavigationMobile={<UserProfileNavigationMobile />}
    />
  );
}
