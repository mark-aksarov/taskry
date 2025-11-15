"use client";

import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { Item, useOverlayTriggerState } from "react-stately";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { Check, ChevronDown, CircleEllipsis, Clock } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export function ProjectDetailStatusMenuTrigger() {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => <MenuDialogHeader heading="Project Status" />}
      renderButton={() => (
        <Button
          {...triggerProps}
          variant="outlined"
          label="Active"
          className="rounded-lg"
          iconRight={
            <ChevronDown size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
      )}
      placement="bottom left"
    >
      <Item textValue="Mark as Pending" key="active">
        <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Mark as Active
      </Item>
      <Item textValue="Mark as Pending" key="pending">
        <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Mark as Pending
      </Item>
      <Item textValue="Mark as Completed" key="done">
        <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Mark as Completed
      </Item>
    </ResponsiveMenuTrigger>
  );
}
