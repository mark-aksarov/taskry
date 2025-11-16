"use client";

import { Item } from "react-stately";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";

export const ProjectToolbarActionsMenuTrigger = () => {
  return (
    <ToolbarActionsMenuTrigger>
      <Item textValue="Delete" key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Remove
      </Item>
      <Item textValue="Mark as Pending" key="pending">
        <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth /> Mark
        as Pending
      </Item>
      <Item textValue="Mark as Active" key="active">
        <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Mark as Active
      </Item>
      <Item textValue="Mark as Completed" key="completed">
        <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
        Mark as Completed
      </Item>
    </ToolbarActionsMenuTrigger>
  );
};
