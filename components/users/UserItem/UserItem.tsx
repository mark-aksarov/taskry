"use client";

import { UserGridItem } from "../UserGridItem";
import { UserListItem } from "../UserListItem";
import { DeleteUserProvider } from "../DeleteUserContext";
import { UpdateUserProvider } from "../UpdateUserContext";
import { useViewMode } from "@/components/common/ViewMode";
import { UserItemPendingOverlay } from "./UserItemPendingOverlay";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";

export interface UserItemProps {
  id: string;
  fullName: string;
  imageUrl?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  position?: {
    name: string;
  };
  editUserFormContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  updateUser: ActionFn<ActionState, FormData>;
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
}

export function UserItem({ updateUser, deleteUser, ...props }: UserItemProps) {
  const { viewMode } = useViewMode();

  return (
    <UpdateUserProvider updateUser={updateUser}>
      <DeleteUserProvider deleteUser={deleteUser}>
        <UserItemPendingOverlay>
          {viewMode === "grid" ? (
            <UserGridItem {...props} />
          ) : (
            <UserListItem {...props} />
          )}
        </UserItemPendingOverlay>
      </DeleteUserProvider>
    </UpdateUserProvider>
  );
}
