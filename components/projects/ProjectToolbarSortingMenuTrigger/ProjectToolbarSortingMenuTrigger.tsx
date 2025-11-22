"use client";

import { Item } from "react-stately";
import { ToolbarSortingMenuTrigger } from "@/components/common/Toolbar";
import { ALargeSmall, Blocks, Calendar, CircleCheck } from "lucide-react";

export function ProjectToolbarSortingMenuTrigger() {
  return (
    <ToolbarSortingMenuTrigger>
      <Item textValue="Title" key="title">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth /> By Title
      </Item>
      <Item textValue="Deadline" key="deadline">
        <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth /> By Deadline
      </Item>
      <Item textValue="Status" key="status">
        <CircleCheck size={16} strokeWidth={1.5} absoluteStrokeWidth /> By
        Status
      </Item>
      <Item textValue="Category" key="category">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth /> By Category
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
