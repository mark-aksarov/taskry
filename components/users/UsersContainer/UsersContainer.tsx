import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { UserFilters } from "@/lib/types";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";
import { getUserCount } from "@/lib/data/user/user.dal";
import { getUserList } from "@/lib/data/user/user.service";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { Pagination } from "@/components/common/Pagination";
import { deleteUsers } from "@/lib/actions/user/deleteUsers";
import { ViewModeLayout } from "@/components/common/ViewMode";

interface UsersContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  filters?: UserFilters;
}

export async function UsersContainer({
  page,
  pageSize,
  sort,
  filters,
}: UsersContainerProps) {
  const users = await getUserList({ page, pageSize, sort, filters });
  const count = await getUserCount(filters);
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
    deleteAction: deleteUsers,
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
