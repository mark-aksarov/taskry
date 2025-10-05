import { getUsers } from "@/lib/queries/user";
import { UserItem } from "../UserItem";
import { Pagination } from "@/components/common/Pagination";

export async function UserList() {
  const users = await getUsers(1);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
