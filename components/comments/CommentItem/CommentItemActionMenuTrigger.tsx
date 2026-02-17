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
import { useCommentFormContext } from "../CommentFormContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useDeleteCommentModal } from "../DeleteCommentModal";

export type CommentItemActionMenuTriggerProps = {
  guestMode: boolean;
  commentId: number;
  commentContent: string;
  className?: string;
};

export function CommentItemActionMenuTrigger({
  guestMode,
  commentId,
  commentContent,
  className,
}: CommentItemActionMenuTriggerProps) {
  const { setEditCommentId, setCommentContent } = useCommentFormContext();

  const t = useTranslations("comments.CommentItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete State
  const { setState: setDeleteCommentModalState } = useDeleteCommentModal();

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
      setDeleteCommentModalState({
        isOpen: true,
        entityId: commentId,
        entityName: "",
      });
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

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
