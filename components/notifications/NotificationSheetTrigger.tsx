"use client";

import { useRef } from "react";
import { Bell } from "lucide-react";
import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "../ui/BottomSheet";
import { useOverlayTriggerState } from "react-stately";
import { Dialog, DialogBody, DialogHeader } from "../ui/Dialog";

export function NotificationSheetTrigger({
  notificationList,
}: {
  notificationList: React.ReactNode;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button
        {...triggerProps}
        ref={triggerRef}
        aria-label="notifications"
        variant="ghost"
        iconLeft={<Bell size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="rounded-full p-3"
      />

      <BottomSheet isDismissable state={state} className="md:hidden">
        <Dialog
          aria-label="App navigation"
          className="max-h-[calc(100dvh-64px)]"
        >
          <DialogHeader>Notifications</DialogHeader>
          <DialogBody className="p-0">{notificationList}</DialogBody>
        </Dialog>
      </BottomSheet>
    </>
  );
}
