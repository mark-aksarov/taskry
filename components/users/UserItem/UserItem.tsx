"use client";

import { UserGridItem } from "../UserGridItem";
import { UserListItem } from "../UserListItem";
import { useViewMode } from "@/components/common/ViewMode";
import { UserItemPendingOverlay } from "./UserItemPendingOverlay";
import { DeleteUserTransitionProvider } from "../DeleteUserTransitionContext";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";
import { UpdateUserTransitionProvider } from "../UpdateUserTransitionContext";

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
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
}

export function UserItem(props: UserItemProps) {
  const { viewMode } = useViewMode();

  return (
    <UpdateUserTransitionProvider>
      <DeleteUserTransitionProvider>
        <UserItemPendingOverlay>
          {viewMode === "grid" ? (
            <UserGridItem {...props} />
          ) : (
            <UserListItem {...props} />
          )}
        </UserItemPendingOverlay>
      </DeleteUserTransitionProvider>
    </UpdateUserTransitionProvider>
  );
}
