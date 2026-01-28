"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ListCheck, Trash } from "lucide-react";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { startTransition, useActionState, useEffect, useState } from "react";
import { ActionFn, ActionState, MarkAsReadPayload } from "@/lib/actions/types";

const deleteActionInitialState: ActionState = {
  status: null,
  message: null,
};

const markAsReadActionInitialState: ActionState = {
  status: null,
  message: null,
};

interface NotificationListItemActionMenuTriggerProps {
  guestMode: boolean | null;
  notificaitonId: number;
  isRead: boolean;
  deleteAction: ActionFn<ActionState, number>;
  markAsReadAction: ActionFn<ActionState, MarkAsReadPayload>;
  mutate: () => void;
}

export function NotificationListItemActionMenuTrigger({
  guestMode,
  notificaitonId,
  isRead,
  deleteAction,
  markAsReadAction,
  mutate,
}: NotificationListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "notifications.NotificationListItemActionMenuTrigger",
  );

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete notification
  const [
    deleteNotificationState,
    deleteNotificationAction,
    deleteNotificationPending,
  ] = useActionState(deleteAction, deleteActionInitialState);

  useEffect(() => {
    if (deleteNotificationState.status === "success") {
      mutate();
    }
  }, [deleteNotificationState, mutate]);

  useActionErrorToast(deleteNotificationState);

  // Mark as read notification
  const [
    markAsReadNotificationState,
    markAsReadNotificationAction,
    markAsReadNotificationPending,
  ] = useActionState(markAsReadAction, markAsReadActionInitialState);

  useEffect(() => {
    if (markAsReadNotificationState.status === "success") {
      mutate();
    }
  }, [markAsReadNotificationState, mutate]);

  useActionErrorToast(markAsReadNotificationState);

  // Handle action
  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "markAsRead") {
      startTransition(() => {
        markAsReadNotificationAction([notificaitonId]);
      });
    } else if (action === "delete") {
      startTransition(() => {
        deleteNotificationAction(notificaitonId);
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
            className="ml-auto"
            data-test="notification-item-action-menu-trigger"
          />
        )}
      >
        <>
          {!isRead && (
            <Item textValue={t("markAsRead")} key="markAsRead">
              <ListCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
              {t("markAsRead")}
            </Item>
          )}
        </>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
          {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
