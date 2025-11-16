"use client";

import { Ellipsis } from "lucide-react";
import { useOverlayTrigger } from "react-aria";
import { MenuDialogHeader } from "../MenuDialogHeader";
import { useOverlayTriggerState } from "react-stately";
import { Button, MenuTriggerProps } from "@/components/ui";
import { ResponsiveMenuTrigger } from "../ResponsiveMenuTrigger";

export function ToolbarActionsMenuTrigger<T extends object = any>({
  children,
}: Pick<MenuTriggerProps<T>, "children">) {
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
      {children}
    </ResponsiveMenuTrigger>
  );
}
