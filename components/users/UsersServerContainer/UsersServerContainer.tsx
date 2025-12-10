import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getUserCount, getUserList } from "@/lib/queries/user";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

interface UsersServerContainerProps {
  page: number;
  pageSize: number;
}

export async function UsersServerContainer({
  page,
  pageSize,
}: UsersServerContainerProps) {
  const workspaceId = await getUserWorkspaceId();
  const users = await getUserList({ workspaceId, page, pageSize });
  const count = await getUserCount({ workspaceId });
  const totalPages = Math.ceil(count / pageSize);

  return (
    <>
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
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            baseUrl="/team"
          />
        </div>
      )}
    </>
  );
}
