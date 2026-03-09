"use client";

import { UserGridItem } from "../UserGridItem";
import { UserListItem } from "../UserListItem";
import { UserItemProviders } from "./UserItemProviders";
import { useViewMode } from "@/components/common/ViewMode";
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
    <UserItemProviders updateUser={updateUser} deleteUser={deleteUser}>
      {viewMode === "grid" ? (
        <UserGridItem {...props} />
      ) : (
        <UserListItem {...props} />
      )}
    </UserItemProviders>
  );
}
