"use client";

import { startTransition } from "react";
import { useDeleteUser } from "../DeleteUserContext";
import { BaseDeleteUserModal } from "../BaseDeleteUserModal";
import { useModal } from "@/components/common/ModalManagerContext";

interface DeleteUserModalProps {
  userId: string;
  userFullName: string;
}

export function DeleteUserModal({
  userId,
  userFullName,
}: DeleteUserModalProps) {
  const { action } = useDeleteUser();
  const { isOpen, onOpenChange } = useModal("deleteUser");

  function handleDelete() {
    const payload = {
      id: userId,
      shouldRedirect: false,
    };

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(payload));
  }

  return (
    <BaseDeleteUserModal
      userFullName={userFullName}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
    />
  );
}
