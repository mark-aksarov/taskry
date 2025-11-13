import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { getUsers } from "@/lib/queries/user";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { UserListItem } from "../UserListItem";

export async function UserViewModeContainer() {
  const users = await getUsers(1);

  return (
    <ViewModeContainer
      list={
        <UserList>
          {users.map((user) => (
            <UserListItem
              key={user.id}
              id={user.id}
              fullName={user.fullName}
              imageUrl={user.imageUrl ?? undefined}
              email={user.email}
              phoneNumber={user.phoneNumber ?? undefined}
              publicLink={user.publicLink ?? undefined}
              position={
                user.position
                  ? {
                      name: user.position.name,
                    }
                  : undefined
              }
              showCheckbox
            />
          ))}
        </UserList>
      }
      grid={<UserGrid users={users} />}
    />
  );
}
