import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserList } from "./UserList";
import { UserGrid } from "./UserGrid";
import { UserListItem } from "./UserListItem";
import { UserGridItem } from "./UserGridItem";
import { getUserList } from "@/lib/data/user/user.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { UserFilters, UserSortField } from "@/lib/types";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { UserDetailContainer } from "./UserDetailContainer";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { EditUserFormContainer } from "./EditUserFormContainer";

interface UsersContainerProps {
  page: number;
  pageSize: number;
  sort: UserSortField;
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
    deleteUser,
  });

  return (
    <EntityPaginationProvider>
      <ViewModeLayout
        list={
          <UserList>
            {users.map((user) => (
              <UserListItem
                key={user.id}
                editUserFormContainer={
                  <EditUserFormContainer userId={user.id} />
                }
                userDetailContainer={<UserDetailContainer userId={user.id} />}
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
                editUserFormContainer={
                  <EditUserFormContainer userId={user.id} />
                }
                userDetailContainer={<UserDetailContainer userId={user.id} />}
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
