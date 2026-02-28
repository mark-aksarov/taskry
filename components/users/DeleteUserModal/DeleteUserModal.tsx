"use client";

import { startTransition } from "react";
import { ModalProps } from "@/components/ui/Modal";
import { useDeleteUserContext } from "../DeleteUserContext";
import { BaseDeleteUserModal } from "./BaseDeleteUserModal";

interface DeleteUserModalProps extends ModalProps {
  userId: string;
  userFullName: string;
}

export function DeleteUserModal({
  userId,
  userFullName,
  isOpen,
  onOpenChange,
}: DeleteUserModalProps) {
  const { action } = useDeleteUserContext();

  const handleDelete = () => {
    onOpenChange?.(false);
    startTransition(() => action({ id: userId, shouldRedirect: false }));
  };

  return (
    <BaseDeleteUserModal
      userFullName={userFullName}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
    />
  );
}
