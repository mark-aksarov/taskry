"use client";

import { useRef } from "react";
import { Bell } from "lucide-react";
import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { useOverlayTriggerState } from "react-stately";
import { Popover } from "@/components/ui/Popover";
import { Dialog, DialogBody } from "@/components/ui/Dialog";

export function NotificationPopoverTrigger({
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

      <Popover
        triggerRef={triggerRef}
        state={state}
        className="w-[400px] max-md:hidden"
        placement="bottom right"
      >
        <Dialog aria-label="Notifications">
          <DialogBody className="p-0">{notificationList}</DialogBody>
        </Dialog>
      </Popover>
    </>
  );
}
