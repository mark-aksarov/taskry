"use client";

import { UserList } from "./UserList";
import { UserListItem } from "./UserListItem";
import { BaseUserItemProps } from "./UserItem";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UserGridLarge, UserGridMobile } from "./UserGrid";
import { UserDetailContainer } from "./UserDetailContainer";
import { UpdateUserFormContainer } from "./UpdateUserFormContainer";
import { UserGridItemLarge, UserGridItemMobile } from "./UserGridItem";
import { UserDetailHeaderContainer } from "./UserDetailHeaderContainer";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

interface UsersDynamicProps {
  page: number;
  pageSize: number;
  totalPages: number;
  users: UserListItemDTO[];
}

export function UsersDynamic({
  page,
  pageSize,
  users,
  totalPages,
}: UsersDynamicProps) {
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
    editUserFormContainer: <UpdateUserFormContainer userId={user.id} />,
  });

  const getContainerProps = (user: UserListItemDTO) => ({
    userDetailContainer: <UserDetailContainer userId={user.id} />,
    userDetailHeaderContainer: <UserDetailHeaderContainer userId={user.id} />,
  });

  const renderListLarge = () => {
    return (
      <UserList>
        {users.map((user) => (
          <UserListItem
            key={user.id}
            {...getCommonProps(user)}
            {...getContainerProps(user)}
          />
        ))}
      </UserList>
    );
  };

  const renderGridLarge = () => {
    return (
      <UserGridLarge>
        {users.map((user) => (
          <UserGridItemLarge
            key={user.id}
            {...getCommonProps(user)}
            {...getContainerProps(user)}
          />
        ))}
      </UserGridLarge>
    );
  };

  const renderGridMobile = () => {
    return (
      <UserGridMobile>
        {users.map((user) => (
          <UserGridItemMobile key={user.id} {...getCommonProps(user)} />
        ))}
      </UserGridMobile>
    );
  };

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      listLarge={renderListLarge}
      gridLarge={renderGridLarge}
      gridMobile={renderGridMobile}
    />
  );
}
