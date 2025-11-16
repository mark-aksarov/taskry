"use client";

import { Item } from "react-stately";
import { ToolbarSortingMenuTrigger } from "@/components/common/Toolbar";

export function TaskToolbarSortingMenuTrigger() {
  return (
    <ToolbarSortingMenuTrigger>
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
    </ToolbarSortingMenuTrigger>
  );
}
