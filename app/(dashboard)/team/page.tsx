import { UsersPage } from "./UsersPage";
import { getUserList } from "@/lib/queries/user";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UsersServerContainer } from "@/components/users/UsersServerContainer";
import { UserFiltersFormServerContainer } from "@/components/users/UserFiltersFormServerContainer";

export default async function AppUsersPage() {
  const users = await getUserList(1);

  if (!users.length) return <UsersPageEmpty />;

  return (
    <UsersPage
      UserFiltersFormContainer={UserFiltersFormServerContainer}
      UsersServerContainer={UsersServerContainer}
    />
  );
}
