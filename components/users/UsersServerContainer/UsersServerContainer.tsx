import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";
import { UserListItemDTO } from "@/lib/dto/user";
import { getUserCount, getUserList } from "@/lib/dal/user";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";

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

  const getUserCommonProps = (user: UserListItemDTO) => ({
    id: user.id,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
    email: user.email,
    phoneNumber: user.phoneNumber,
    publicLink: user.publicLink,
    position: user.position,
  });

  return (
    <>
      <ViewModeLayout
        list={
          <UserList>
            {users.map((user) => (
              <UserListItem
                key={user.id}
                {...getUserCommonProps(user)}
                showCheckbox
              />
            ))}
          </UserList>
        }
        grid={
          <UserGrid>
            {users.map((user) => (
              <UserGridItem key={user.id} {...getUserCommonProps(user)} />
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
