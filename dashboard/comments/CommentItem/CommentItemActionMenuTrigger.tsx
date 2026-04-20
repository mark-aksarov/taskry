"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useSendComment } from "../SendCommentContext";
import { useUpdateComment } from "../UpdateCommentContext";
import { useCommentFormContext } from "../CommentFormContext";
import { useCommentItemPending } from "./useCommentItemPending";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useModal } from "@/dashboard/common/ModalManagerContext";

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

  const t = useTranslations("dashboard.comments.CommentItemActionMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteComment");

  /**
   * Handles menu actions for a comment item.
   * - If the user is a guest, opens the guest access modal.
   * - If "edit" is selected, switches the form to edit mode
   *   and pre-fills it with the current comment data.
   * - If "delete" is selected, opens the delete confirmation modal.
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      const action = key.toString();
      if (action === "edit") {
        setEditCommentId(commentId);
        setCommentContent(commentContent);
      } else if (action === "delete") {
        onDeleteModalOpenChange(true);
      }
    });
  }

  // Pending state for this specific comment item (when it’s being deleted or updated)
  const isPending = useCommentItemPending(commentId);

  // Form-level async states.
  // While a create or update request is running,
  // we prevent opening the action menu to avoid conflicting operations.
  const { isPending: isSendCommentPending } = useSendComment();
  const { isPending: isUpdateCommentPending } = useUpdateComment();

  return (
    <ItemBaseActionMenuTrigger
      onAction={handleAction}
      renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
      renderButton={() => (
        <ItemBaseActionMenuButton
          className={className}
          isPending={isPending}
          isDisabled={
            (isSendCommentPending || isUpdateCommentPending) && !isPending
          }
          data-test="comment-item-action-menu-trigger"
          data-id={commentId}
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
  );
}
