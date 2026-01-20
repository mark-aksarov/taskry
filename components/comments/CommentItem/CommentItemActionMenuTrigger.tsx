"use client";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { DeleteCommentModal } from "../DeleteCommentModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";

export type CommentItemActionMenuTriggerProps = {
  commentId: number;
  className?: string;
  guestMode?: boolean;
  deleteAction: ActionFn<ActionState, number>;
  mutate: () => void;
};

export function CommentItemActionMenuTrigger({
  commentId,
  className,
  guestMode,
  deleteAction,
  mutate,
}: CommentItemActionMenuTriggerProps) {
  const t = useTranslations("comments.CommentItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete State
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
    } else if (action === "delete") {
      setIsOpenDeleteModal(true);
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        trigger-data-test={`comment-item-${commentId}-action-menu-trigger`}
        className={className}
        onAction={handleAction}
      >
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <DeleteCommentModal
        commentId={commentId}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
        mutate={mutate}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
