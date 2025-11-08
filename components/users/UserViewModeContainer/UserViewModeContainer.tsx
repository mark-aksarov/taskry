import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { getUsers } from "@/lib/queries/user";
import { ViewModeContainer } from "@/components/common/ViewMode";

export async function UserViewModeContainer() {
  const users = await getUsers(1);

  return (
    <ViewModeContainer
      list={<UserList users={users} />}
      grid={<UserGrid users={users} />}
    />
  );
}
