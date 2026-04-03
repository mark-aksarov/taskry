"use client";

import {
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import { tv } from "tailwind-variants";
import { startTransition } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { focusRing } from "@/components/ui/styles";
import { useToggleSubtask } from "../ToggleSubtaskContext";
import { CheckCheck, Loader2, Pencil, Trash } from "lucide-react";
import { useModal } from "@/components/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useSubtaskListItemPending } from "../SubtaskListItem/useSubtaskListItemPending";

interface SubtaskActionMenuTriggerProps {
  subtaskId: number;
  subtaskText: string;
  isDone: boolean;
}

const buttonStyles = tv({
  extend: focusRing,
  base: "pressed:underline flex cursor-pointer items-center gap-2 text-left text-sm hover:underline",
  variants: {
    isDone: {
      true: "text-black dark:text-white",
      false: "text-gray-500 dark:text-gray-400",
    },
  },
});

export function SubtaskActionMenuTrigger({
  subtaskId,
  subtaskText,
  isDone,
}: SubtaskActionMenuTriggerProps) {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteSubtask");

  // States for toggling subtask from context
  const { action: toggleSubtaskAction } = useToggleSubtask();

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateSubtask");

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "delete") {
        onDeleteModalOpenChange(true);
      } else if (key === "edit") {
        onUpdateModalOpenChange(true);
      } else if (key === "toggle") {
        startTransition(() =>
          toggleSubtaskAction({ id: subtaskId, isDone: !isDone }),
        );
      }
    });
  }

  //Pending state while deleting or updating
  const isPending = useSubtaskListItemPending();

  return (
    <ItemBaseActionMenuTrigger
      onAction={handleAction}
      placement="bottom left"
      renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
      renderButton={() => (
        <Button
          isPending={isPending}
          className={(renderProps) => buttonStyles({ ...renderProps, isDone })}
        >
          {subtaskText}
          {isPending && (
            <Loader2
              data-testid="loader-icon"
              size={16}
              strokeWidth={1.5}
              absoluteStrokeWidth
              className="mt-0.75 shrink-0 animate-spin self-start"
            />
          )}
        </Button>
      )}
    >
      <Item textValue={t("edit")} key="edit">
        <Pencil size={16} /> {t("edit")}
      </Item>
      <Item textValue={isDone ? t("undone") : t("done")} key="toggle">
        <CheckCheck size={16} /> {isDone ? t("undone") : t("done")}
      </Item>
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} /> {t("delete")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
