"use client";

import { tv } from "tailwind-variants";
import { linkStyles } from "../ui/Link";
import { CheckCheck } from "lucide-react";
import { GuestModeModal } from "../common/GuestModeModal";
import { Button, ButtonProps } from "react-aria-components";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { startTransition, useActionState, useEffect, useState } from "react";
import { ActionFn, ActionState, MarkAsReadPayload } from "@/lib/actions/types";

const styles = tv({
  extend: linkStyles,
  base: "gap-2 text-sm font-bold",
});

const markAsReadActionInitialState: ActionState = {
  status: null,
  message: null,
};

interface MarkAllAsReadButtonProps extends ButtonProps {
  guestMode: boolean;
  markAsReadAction: ActionFn<ActionState, MarkAsReadPayload>;
  mutate: () => void;
}

export function MarkAllAsReadButton({
  guestMode,
  markAsReadAction,
  mutate,
  ...props
}: MarkAllAsReadButtonProps) {
  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

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

  function handlePress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    startTransition(() => markAsReadNotificationAction(null));
  }

  return (
    <>
      <Button
        {...props}
        className={(renderProps) =>
          styles({ ...renderProps, variant: "primary" })
        }
        onPress={handlePress}
        data-test="mark-all-as-read-button"
      >
        <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Mark all as read
      </Button>

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
