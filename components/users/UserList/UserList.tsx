import { UserListItem, UserListItemType } from "../UserListItem";
import { List } from "@/components/common/List";

interface UserListProps {
  users: UserListItemType[];
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
