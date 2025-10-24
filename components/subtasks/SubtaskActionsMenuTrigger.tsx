"use client";

import { useOverlayTrigger } from "react-aria";
import { Check, Clock, Ellipsis, Trash } from "lucide-react";
import { Button } from "@/components/ui";
import { Item, useOverlayTriggerState } from "react-stately";
import { ResponsiveMenuTrigger } from "../common/ResponsiveMenuTrigger";
import { MenuDialogHeader } from "../common/MenuDialogHeader";

export const SubtaskActionsMenuTrigger = () => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
      renderButton={() => (
        <Button
          {...triggerProps}
          aria-label="actions"
          variant="ghost"
          className="rounded-full"
          iconLeft={
            <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
      )}
      placement="bottom right"
    >
      <Item textValue="Delete" key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Remove
      </Item>
      <Item textValue="Mark as Active" key="active">
        <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Mark as Active
      </Item>
      <Item textValue="Mark as Done" key="done">
        <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Mark as Done
      </Item>
    </ResponsiveMenuTrigger>
  );
};
