"use client";

import { Item } from "react-stately";
import { ToolbarSortingMenuTrigger } from "@/components/common/Toolbar";

export function ProjectToolbarSortingMenuTrigger() {
  return (
    <ToolbarSortingMenuTrigger>
      <Item textValue="Default" key="default">
        By Default
      </Item>
      <Item textValue="Status" key="status">
        By Status
      </Item>
      <Item textValue="Deadline" key="deadline">
        By Deadline
      </Item>
      <Item textValue="Title" key="title">
        By Title
      </Item>
      <Item textValue="Assignee" key="creator">
        By Creator
      </Item>
      <Item textValue="Customer" key="customer">
        By Customer
      </Item>
      <Item textValue="Category" key="category">
        By Category
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
