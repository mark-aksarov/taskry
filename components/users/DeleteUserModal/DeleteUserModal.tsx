"use client";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { BaseDeleteUserModal } from "./BaseDeleteUserModal";
import { useDeleteUserTransition } from "../DeleteUserTransitionContext";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

interface DeleteUserModalProps extends ModalProps {
  userId: string;
  userFullName: string;
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
}

export function DeleteUserModal({
  userId,
  userFullName,
  deleteUser,
  isOpen,
  onOpenChange,
}: DeleteUserModalProps) {
  const t = useTranslations("users.DeleteUserModal");

  const { startTransition } = useDeleteUserTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteUser,
    successMessage: t("successMessage"),
  });

  function handleDelete() {
    //close modal before deleting
    onOpenChange?.(false);
    startTransition(() => action({ id: userId, shouldRedirect: false }));
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
