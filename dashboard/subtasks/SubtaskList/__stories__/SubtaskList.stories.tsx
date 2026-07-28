import React from "react";
import { SubtaskList } from "../SubtaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskListExample } from "./SubtaskListExample";
import { DeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/subtasks/SubtaskList",
  component: SubtaskList,
  decorators: [
    (Story) => (
      <DeleteTaskProvider>
        <Story />
      </DeleteTaskProvider>
    ),
    withDashboardLayoutProviders,
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
