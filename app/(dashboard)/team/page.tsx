import { UsersPage } from "./UsersPage";
import { getUsers } from "@/lib/queries/user";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UserViewModeContainer } from "@/components/users/UserViewModeContainer";
import { PositionCheckboxGroupContainer } from "@/components/users/PositionCheckboxGroup";

export default async function AppUsersPage() {
  const users = await getUsers(1);

  if (!users) return <UsersPageEmpty />;

  return (
    <UsersPage
      PositionCheckboxGroupContainer={PositionCheckboxGroupContainer}
      UserViewModeContainer={UserViewModeContainer}
    />
  );
}
