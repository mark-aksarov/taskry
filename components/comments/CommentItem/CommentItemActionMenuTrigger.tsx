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
import { useCommentFormContext } from "../CommentFormContext";
import { useDeleteCommentContext } from "../DeleteCommentContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

export type CommentItemActionMenuTriggerProps = {
  commentId: number;
  commentContent: string;
  className?: string;
};

export function CommentItemActionMenuTrigger({
  commentId,
  commentContent,
  className,
}: CommentItemActionMenuTriggerProps) {
  const { setEditCommentId, setCommentContent } = useCommentFormContext();

  const t = useTranslations("comments.CommentItemActionMenuTrigger");

  // Deleting the company
  const { isPending: isDeletePending } = useDeleteCommentContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setEditCommentId(commentId);
      setCommentContent(commentContent);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
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
            isPending={isDeletePending}
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
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
