import React from "react";
import { SubtaskList } from "../SubtaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskListExample } from "./SubtaskListExample";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withDeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider/__stories__";

const meta = {
  title: "dashboard/subtasks/SubtaskList",
  component: SubtaskList,
  decorators: [
    withDeleteTaskProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain = {
  args: {
    children: <SubtaskListExample variant="plain" showActionMenu={false} />,
  },
} satisfies Story;

export const Rich = {
  args: {
    children: <SubtaskListExample variant="rich" showActionMenu />,
  },
} satisfies Story;
