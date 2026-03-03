import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { UserItem } from "./UserItem";
import { UserList } from "./UserList";
import { UserGrid } from "./UserGrid";
import { getUserList } from "@/lib/data/user/user.dal";
import { UserFilters, UserSortField } from "@/lib/types";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { updateUser } from "@/lib/actions/user/updateUser";
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

  const items = (
    <>
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          fullName={user.fullName}
          imageUrl={user.imageUrl}
          email={user.email}
          phoneNumber={user.phoneNumber}
          publicLink={user.publicLink}
          position={user.position}
          deleteUser={deleteUser}
          updateUser={updateUser}
          editUserFormContainer={<EditUserFormContainer userId={user.id} />}
          userDetailContainer={<UserDetailContainer userId={user.id} />}
        />
      ))}
    </>
  );

  return (
    <EntityPaginationProvider>
      <ViewModeLayout
        list={<UserList>{items}</UserList>}
        grid={<UserGrid>{items}</UserGrid>}
      />

      <EntityContainerPagination
        page={page}
        totalPages={Math.ceil(totalCount / pageSize)}
        pageSize={pageSize}
      />
    </EntityPaginationProvider>
  );
}
