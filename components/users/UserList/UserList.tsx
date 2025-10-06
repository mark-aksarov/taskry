import { getUsers } from "@/lib/queries/user";
import { UserItem } from "../UserItem";

export async function UserList() {
  const users = await getUsers(1);

  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
