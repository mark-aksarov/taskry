"use client";

import { Trash } from "lucide-react";
import { Item } from "react-stately";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";

export const UserToolbarActionsMenuTrigger = () => {
  return (
    <ToolbarActionsMenuTrigger>
      <Item textValue="Delete" key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Remove
      </Item>
    </ToolbarActionsMenuTrigger>
  );
};
