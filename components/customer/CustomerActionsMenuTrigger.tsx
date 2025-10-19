"use client";

import { useOverlayTrigger } from "react-aria";
import { Ellipsis, Trash } from "lucide-react";
import { Button } from "@/components/ui";
import { Item, useOverlayTriggerState } from "react-stately";
import { ResponsiveMenuTrigger } from "../common/ResponsiveMenuTrigger";
import { MenuDialogHeader } from "../common/MenuDialogHeader";

export const CustomerActionsMenuTrigger = () => {
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
            variant="outlined"
            iconLeft={
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="md:hidden"
          />
          <Button
            {...triggerProps}
            aria-label="actions"
            variant="outlined"
            label="Actions"
            iconLeft={
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="max-md:hidden"
          />
        </>
      )}
      placement="bottom left"
    >
      <Item textValue="Delete" key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Remove
      </Item>
    </ResponsiveMenuTrigger>
  );
};
