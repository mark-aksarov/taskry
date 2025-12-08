import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";
import { getUserList } from "@/lib/queries/user";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function UsersServerContainer() {
  const workspaceId = await getUserWorkspaceId();
  const users = await getUserList(workspaceId);

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
