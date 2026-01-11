"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ListCheck, Trash } from "lucide-react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";
import { startTransition, useActionState, useEffect, useState } from "react";

const deleteActionInitialState: ActionState = {
  status: null,
  message: null,
};

interface NotificationListItemActionMenuTriggerProps {
  notificaitonId: number;
  isRead: boolean;
  guestMode?: boolean;
  deleteAction: ActionFn<ActionState, number>;
  mutate: () => void;
}

export function NotificationListItemActionMenuTrigger({
  notificaitonId,
  isRead,
  guestMode,
  deleteAction,
  mutate,
}: NotificationListItemActionMenuTriggerProps) {
  const t = useTranslations("notifications.NotificationItem");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete notification
  const [
    deleteNotificationState,
    deleteNotificationAction,
    deleteNotificationPending,
  ] = useActionState(deleteAction, deleteActionInitialState);

  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
    } else if (action === "delete") {
      startTransition(() => {
        deleteNotificationAction(notificaitonId);
      });
    }
  }

  useEffect(() => {
    if (deleteNotificationState.status === "success") {
      mutate();
    }
  }, [deleteNotificationState, mutate]);

  useActionErrorToast(deleteNotificationState);

  return (
    <>
      <ItemBaseActionMenuTrigger
        trigger-data-test="notification-item-action-menu-trigger"
        className="ml-auto"
        onAction={handleAction}
      >
        <>
          {!isRead && (
            <Item textValue={t("markAsRead")} key="read">
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
