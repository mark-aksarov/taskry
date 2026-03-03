"use client";

import { startTransition } from "react";
import { useDeleteUser } from "../DeleteUserContext";
import { BaseDeleteUserModal } from "./BaseDeleteUserModal";

interface DeleteUserModalProps {
  userId: string;
  userFullName: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteUserModal({
  userId,
  userFullName,
  isOpen,
  onOpenChange,
}: DeleteUserModalProps) {
  const { action } = useDeleteUser();

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
