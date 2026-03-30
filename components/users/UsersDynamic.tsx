"use client";

import { UserList } from "./UserList";
import { UserListItem } from "./UserListItem";
import { UserItemWrapper } from "./UserItemWrapper";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { UserGridLarge, UserGridMobile } from "./UserGrid";
import { UserGridItemLarge, UserGridItemMobile } from "./UserGridItem";
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
  const renderListLarge = () => {
    return (
      <UserList>
        {users.map((user) => (
          <UserItemWrapper
            key={user.id}
            userId={user.id}
            userFullName={user.fullName}
          >
            <UserListItem {...user} />
          </UserItemWrapper>
        ))}
      </UserList>
    );
  };

  const renderGridLarge = () => {
    return (
      <UserGridLarge>
        {users.map((user) => (
          <UserItemWrapper
            key={user.id}
            userId={user.id}
            userFullName={user.fullName}
          >
            <UserGridItemLarge {...user} />
          </UserItemWrapper>
        ))}
      </UserGridLarge>
    );
  };

  const renderGridMobile = () => {
    return (
      <UserGridMobile>
        {users.map((user) => (
          <UserItemWrapper
            key={user.id}
            userId={user.id}
            userFullName={user.fullName}
          >
            <UserGridItemMobile {...user} />
          </UserItemWrapper>
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
