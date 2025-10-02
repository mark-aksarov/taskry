"use client";

import { useOverlayTrigger } from "react-aria";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui/Dialog";
import { Item, useOverlayTriggerState } from "react-stately";
import { useResponsiveOverlayType } from "@/lib/hooks/useResponsiveOverlayType";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export const ProjectActionsMenuTrigger = () => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  const itemClasses = "flex items-center gap-4 font-bold";

  const overlayType = useResponsiveOverlayType();

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => (
        <DialogHeader className="px-4 py-3">
          <DialogHeading className="text-base">Actions</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      renderButton={() => (
        <Button
          {...triggerProps}
          aria-label="actions"
          label={overlayType === "popover" ? "Actions" : null}
          variant="outlined"
          iconLeft={
            <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
      )}
      placement="bottom right"
    >
      <Item textValue="Delete" key="delete">
        <div className={itemClasses}>
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Remove
        </div>
      </Item>
      <Item textValue="Mark as Pending" key="pending">
        <div className={itemClasses}>
          <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
          Mark as Pending
        </div>
      </Item>
      <Item textValue="Mark as Active" key="active">
        <div className={itemClasses}>
          <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Mark as Active
        </div>
      </Item>
      <Item textValue="Mark as Completed" key="completed">
        <div className={itemClasses}>
          <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Mark as Completed
        </div>
      </Item>
    </ResponsiveMenuTrigger>
  );
};
