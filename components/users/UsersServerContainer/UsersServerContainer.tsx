import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { getUserList } from "@/lib/queries/user";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";

export async function UsersServerContainer() {
  const users = await getUserList(1);

  return (
    <ViewModeLayout
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
      grid={
        <UserGrid>
          {users.map((user) => (
            <UserGridItem
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
            />
          ))}
        </UserGrid>
      }
    />
  );
}
