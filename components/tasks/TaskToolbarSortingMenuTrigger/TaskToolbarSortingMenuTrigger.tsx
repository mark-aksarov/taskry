"use client";

import { Item } from "react-stately";
import { ToolbarSortingMenuTrigger } from "@/components/common/Toolbar";
import { Calendar, CircleCheck, ALargeSmall, Blocks } from "lucide-react";

export function TaskToolbarSortingMenuTrigger() {
  return (
    <ToolbarSortingMenuTrigger>
      <Item textValue="Title" key="title">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth /> By title
      </Item>
      <Item textValue="Deadline" key="deadline">
        <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth /> By deadline
      </Item>
      <Item textValue="Status" key="status">
        <CircleCheck size={16} strokeWidth={1.5} absoluteStrokeWidth /> By
        status
      </Item>
      <Item textValue="Category" key="category">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth /> By category
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
