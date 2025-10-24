"use client";

import { useOverlayTrigger } from "react-aria";
import { Download, Ellipsis, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui";
import { Item, useOverlayTriggerState } from "react-stately";
import { ResponsiveMenuTrigger } from "../common/ResponsiveMenuTrigger";
import { MenuDialogHeader } from "../common/MenuDialogHeader";

export const AttachmentActionsMenuTrigger = () => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
      renderButton={() => (
        <>
          <Button
            {...triggerProps}
            aria-label="actions"
            variant="ghost"
            className="rounded-full"
            iconLeft={
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />
        </>
      )}
      placement="bottom right"
    >
      <Item textValue="Download" key="download">
        <Download size={16} /> Download
      </Item>
      <Item textValue="Edit" key="edit">
        <Pencil size={16} /> Edit
      </Item>
      <Item textValue="Delete" key="delete">
        <Trash size={16} /> Delete
      </Item>
    </ResponsiveMenuTrigger>
  );
};
