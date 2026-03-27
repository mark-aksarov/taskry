"use client";

import { UserList } from "./UserList";
import { UserListItem } from "./UserListItem";
import { BaseUserItemProps } from "./UserItem";
import { UserItemModals } from "./UserItemModals";
import { UserItemProviders } from "./UserItemProviders";
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
            user={user}
            renderItem={(props) => <UserListItem {...props} />}
          />
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
            user={user}
            renderItem={(props) => <UserGridItemLarge {...props} />}
          />
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
            user={user}
            renderItem={(props) => <UserGridItemMobile {...props} />}
          />
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

interface UserItemWrapperProps {
  user: UserListItemDTO;
  renderItem: (props: BaseUserItemProps) => React.ReactNode;
}

function UserItemWrapper({ user, renderItem }: UserItemWrapperProps) {
  const commonProps: BaseUserItemProps = {
    id: user.id,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
    email: user.email,
    phoneNumber: user.phoneNumber,
    publicLink: user.publicLink,
    position: user.position,
  };

  return (
    <UserItemProviders>
      {renderItem(commonProps)}
      <UserItemModals user={user} />
    </UserItemProviders>
  );
}
