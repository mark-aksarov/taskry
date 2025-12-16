import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getUserCount, getUserList } from "@/lib/data/user";

interface UsersServerContainerProps {
  page: number;
  pageSize: number;
}

export async function UsersServerContainer({
  page,
  pageSize,
}: UsersServerContainerProps) {
  const users = await getUserList({ page, pageSize });
  const count = await getUserCount();
  const totalPages = Math.ceil(count / pageSize);

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl: "/team",
  };

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
            {...paginationProps}
            size="large"
            className="max-md:hidden"
          />
          <Pagination {...paginationProps} className="md:hidden" />
        </div>
      )}
    </>
  );
}
