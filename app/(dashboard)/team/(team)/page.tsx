import { UsersPage } from "./UsersPage";
import { getUserList } from "@/lib/queries/user";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UsersServerContainer } from "@/components/users/UsersServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { UserFiltersFormServerContainer } from "@/components/users/UserFiltersFormServerContainer";
import { NewProjectFormServerContainer } from "@/components/projects/NewProjectFormServerContainer";

export default async function AppUsersPage() {
  const users = await getUserList(1);

  if (!users.length) return <UsersPageEmpty />;

  return (
    <UsersPage
      UserFiltersFormContainer={UserFiltersFormServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
      NewProjectFormContainer={NewProjectFormServerContainer}
      UsersServerContainer={UsersServerContainer}
    />
  );
}
