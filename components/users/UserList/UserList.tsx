import { getUsers } from "@/lib/queries/user";
import { UserListItem } from "../UserListItem";
import { List } from "@/components/common/List";

export async function UserList() {
  const users = await getUsers(1);

  return (
    <List>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </List>
  );
}
