import { UsersPage } from "./UsersPage";
import { getUsers } from "@/lib/queries/user";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersForm";
import { UserViewModeContainer } from "@/components/users/UserViewModeContainer";

export default async function AppUsersPage() {
  const users = await getUsers(1);

  if (!users) return <UsersPageEmpty />;

  return (
    <UsersPage
      UserFiltersFormContainer={UserFiltersFormContainer}
      UserViewModeContainer={UserViewModeContainer}
    />
  );
}
