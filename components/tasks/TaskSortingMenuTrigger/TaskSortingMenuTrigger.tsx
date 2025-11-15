"use client";

import { Button } from "@/components/ui";
import { ArrowDownUp } from "lucide-react";
import { useOverlayTrigger } from "react-aria";
import { Item, useOverlayTriggerState } from "react-stately";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export function TaskSortingMenuTrigger() {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
      overlayClassName="md:w-[150px]"
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
            aria-label="actions"
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
      <Item textValue="Status" key="status">
        By status
      </Item>
      <Item textValue="Deadline" key="deadline">
        By deadline
      </Item>
      <Item textValue="Title" key="title">
        By title
      </Item>
      <Item textValue="Assignee" key="assignee">
        By assignee
      </Item>
      <Item textValue="Category" key="category">
        By category
      </Item>
    </ResponsiveMenuTrigger>
  );
}
