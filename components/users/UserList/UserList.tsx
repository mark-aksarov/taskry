import { UserListItem } from "../UserListItem";
import { List } from "@/components/common/List";
import { UserPreview } from "@/lib/queries/types";

export function UserList({ users }: { users: UserPreview[] }) {
  return (
    <List>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </List>
  );
}
