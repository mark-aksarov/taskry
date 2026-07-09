"use client";

import dynamic from "next/dynamic";
import { UserGrid } from "./UserGrid";
import { UpdateUserModal } from "./UpdateUserModal";
import { DeleteUserModal } from "./DeleteUserModal";
import { UserListItemSkeleton } from "./UserListItem";
import { DeleteUserProvider } from "./DeleteUserProvider";
import { UpdateUserProvider } from "./UpdateUserProvider";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { GuestModeModal } from "../common/GuestModeModal";
import { UserDetailSideSheet } from "./UserDetailSideSheet";
import { UserDetailContainer } from "./UserDetailContainer";
import { UserGridItemMobileSkeleton } from "./UserGridItem";
import { UpdateUserFormContainer } from "./UpdateUserFormContainer";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { UserDetailHeaderContainer } from "./UserDetailHeaderContainer";

const UserListItem = dynamic(
  () => import("./UserListItem").then((mod) => mod.UserListItem),
  {
    ssr: false,
    loading: () => <UserListItemSkeleton />,
  },
);

const UserGridItemLarge = dynamic(
  () => import("./UserGridItem").then((mod) => mod.UserGridItemLarge),
  {
    ssr: false,
  },
);

const UserGridItemMobile = dynamic(
  () => import("./UserGridItem").then((mod) => mod.UserGridItemMobile),
  {
    ssr: false,
    loading: () => <UserGridItemMobileSkeleton />,
  },
);

export interface UserGridContainerProps {
  users: UserListItemDTO[];
}

export function UserGridContainer({ users }: UserGridContainerProps) {
  return (
    <UserGrid>
      {users.map((user) => (
        <ModalManagerProvider key={user.id}>
          <DeleteUserProvider>
            <UpdateUserProvider>
              {/* Dynamic */}
              <UserListItem {...user} />
              <UserGridItemMobile {...user} />
              <UserGridItemLarge {...user} />

              {/* Modals and side sheets */}
              <UserDetailSideSheet
                userId={user.id}
                userDetailContainer={<UserDetailContainer userId={user.id} />}
                userDetailHeaderContainer={
                  <UserDetailHeaderContainer userId={user.id} />
                }
              />

              <UpdateUserModal
                updateUserFormContainer={
                  <UpdateUserFormContainer userId={user.id} />
                }
              />

              <DeleteUserModal userId={user.id} userFullName={user.fullName} />
            </UpdateUserProvider>
          </DeleteUserProvider>

          <GuestModeModal />
        </ModalManagerProvider>
      ))}
    </UserGrid>
  );
}
