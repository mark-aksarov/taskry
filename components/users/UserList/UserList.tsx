import { getUsers } from "@/lib/queries/user";
import { UserItem } from "../UserItem";
import { Pagination } from "@/components/common/Pagination";
import {
  EmptyView,
  EmptyViewDescription,
  EmptyViewLink,
  EmptyViewTitle,
} from "@/components/common/EmptyView";

export async function UserList() {
  const users = await getUsers(1);

  if (!users.length) {
    return (
      <div className="flex w-full items-center justify-center max-md:py-10 md:py-20">
        <EmptyView>
          <EmptyViewTitle className="text-2xl!">No users found</EmptyViewTitle>
          <EmptyViewDescription>
            Invite team members to start collaborating on your projects.
          </EmptyViewDescription>
          <EmptyViewLink href="#">New User</EmptyViewLink>
        </EmptyView>
      </div>
    );
  }

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
