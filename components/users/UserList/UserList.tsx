import { UserListItem } from "../UserListItem";
import { List } from "@/components/common/List";
import { UserPreview } from "@/lib/queries/types";

interface UserListProps {
  users: UserPreview[];
  showCheckbox?: boolean;
}

export function UserList({ users, showCheckbox = true }: UserListProps) {
  return (
    <List>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} showCheckbox={showCheckbox} />
      ))}
    </List>
  );
}
