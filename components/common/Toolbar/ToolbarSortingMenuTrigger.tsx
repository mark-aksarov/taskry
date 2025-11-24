"use client";

import { ArrowDownUp } from "lucide-react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  Button,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  MenuTriggerProps,
} from "@/components/ui";

export function ToolbarSortingMenuTrigger<T extends object = any>({
  children,
}: Pick<MenuTriggerProps<T>, "children">) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => (
        <DialogHeader>
          <DialogHeading>Sorting</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      overlayClassName="md:min-w-[150px]"
      renderButton={() => (
        <>
          <Button
            {...triggerProps}
            aria-label="sorting"
            variant="outlined"
            iconLeft={
              <ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="md:hidden"
          />
          <Button
            {...triggerProps}
            variant="outlined"
            label="Sorting"
            iconLeft={
              <ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
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
