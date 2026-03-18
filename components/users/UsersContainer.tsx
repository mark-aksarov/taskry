import "server-only";

import { UserList } from "./UserList";
import { UserListItem } from "./UserListItem";
import { BaseUserItemProps } from "./UserItem";
import { getUserList } from "@/lib/data/user/user.dal";
import { UserFilters, UserSortField } from "@/lib/types";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UserGridLarge, UserGridMobile } from "./UserGrid";
import { UserDetailContainer } from "./UserDetailContainer";
import { EditUserFormContainer } from "./EditUserFormContainer";
import { UserGridItemLarge, UserGridItemMobile } from "./UserGridItem";
import { UserDetailHeaderContainer } from "./UserDetailHeaderContainer";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

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

  const getCommonProps = (user: UserListItemDTO): BaseUserItemProps => ({
    id: user.id,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
    email: user.email,
    phoneNumber: user.phoneNumber,
    publicLink: user.publicLink,
    position: user.position,
    updateUser: updateUser,
    deleteUser: deleteUser,
    editUserFormContainer: <EditUserFormContainer userId={user.id} />,
  });

  const getContainerProps = (user: UserListItemDTO) => ({
    userDetailContainer: <UserDetailContainer userId={user.id} />,
    userDetailHeaderContainer: <UserDetailHeaderContainer userId={user.id} />,
  });

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      listLarge={
        <UserList>
          {users.map((user) => (
            <UserListItem
              key={user.id}
              {...getCommonProps(user)}
              {...getContainerProps(user)}
            />
          ))}
        </UserList>
      }
      gridLarge={
        <UserGridLarge>
          {users.map((user) => (
            <UserGridItemLarge
              key={user.id}
              {...getCommonProps(user)}
              {...getContainerProps(user)}
            />
          ))}
        </UserGridLarge>
      }
      gridMobile={
        <UserGridMobile>
          {users.map((user) => (
            <UserGridItemMobile key={user.id} {...getCommonProps(user)} />
          ))}
        </UserGridMobile>
      }
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
