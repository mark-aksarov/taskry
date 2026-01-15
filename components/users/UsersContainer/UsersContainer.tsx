import {
  EntityContainerPagination,
  EntityPaginationProvider,
} from "@/components/common/EntityContainerPagination";

import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { UserFilters } from "@/lib/types";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";
import { getUserCount } from "@/lib/data/user/user.dal";
import { getUserList } from "@/lib/data/user/user.service";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { deleteUsers } from "@/lib/actions/user/deleteUsers";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";

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
  const { items: users, totalCount } = await getUserList({
    page,
    pageSize,
    sort,
    filters,
  });

  const getUserCommonProps = (user: UserListItemDTO) => ({
    id: user.id,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
    email: user.email,
    phoneNumber: user.phoneNumber,
    publicLink: user.publicLink,
    position: user.position,
  });

  function renderMenuTrigger(user: UserListItemDTO, className?: string) {
    return (
      <UserItemActionMenuTrigger
        userId={user.id}
        userFullName={user.fullName}
        deleteAction={deleteUsers}
        className={className}
      />
    );
  }

  return (
    <EntityPaginationProvider>
      <ViewModeLayout
        list={
          <UserList>
            {users.map((user) => (
              <UserListItem
                key={user.id}
                menuTrigger={renderMenuTrigger(user)}
                {...getUserCommonProps(user)}
              />
            ))}
          </UserList>
        }
        grid={
          <UserGrid>
            {users.map((user) => (
              <UserGridItem
                key={user.id}
                menuTrigger={(renderMenuTrigger(user), "-mr-2")}
                {...getUserCommonProps(user)}
              />
            ))}
          </UserGrid>
        }
      />

      <EntityContainerPagination
        page={page}
        totalPages={Math.ceil(totalCount / pageSize)}
        pageSize={pageSize}
      />
    </EntityPaginationProvider>
  );
}
