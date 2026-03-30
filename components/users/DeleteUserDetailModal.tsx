"use client";

import { startTransition } from "react";
import { useDeleteUser } from "./DeleteUserContext";
import { BaseDeleteUserModal } from "./BaseDeleteUserModal";
import { useModal } from "@/components/common/ModalManagerContext";

interface DeleteUserModalProps {
  userId: string;
  userFullName: string;
}

export function DeleteUserDetailModal({
  userId,
  userFullName,
}: DeleteUserModalProps) {
  const { action } = useDeleteUser();
  const { isOpen, onOpenChange } = useModal("deleteUser");

  // Close modal and delete user
  // We should redirect to the user list page after deletion
  function handleDelete() {
    onOpenChange(false);
    startTransition(() => action({ id: userId, shouldRedirect: true }));
  }

  return (
    <BaseDeleteUserModal
      onDelete={handleDelete}
      userFullName={userFullName}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
