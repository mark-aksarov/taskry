"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { DeleteCommentModal } from "../DeleteCommentModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useHasGuestMode } from "@/lib/hooks/useHasGuestMode";
import { useCommentFormContext } from "../CommentFormContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";

export type CommentItemActionMenuTriggerProps = {
  commentId: number;
  commentContent: string;
  className?: string;
  deleteAction: ActionFn<ActionState, number>;
  mutate: () => void;
};

export function CommentItemActionMenuTrigger({
  commentId,
  commentContent,
  className,
  deleteAction,
  mutate,
}: CommentItemActionMenuTriggerProps) {
  const { setEditCommentId, setCommentContent } = useCommentFormContext();

  const t = useTranslations("comments.CommentItemActionMenuTrigger");

  const guestMode = useHasGuestMode();

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
      setEditCommentId(commentId);
      setCommentContent(commentContent);
    } else if (action === "delete") {
      setIsOpenDeleteModal(true);
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className={className}
            data-test={`comment-item-${commentId}-action-menu-trigger`}
          />
        )}
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
