import { Meta, StoryObj } from "@storybook/react";
import { TaskFormSkeleton } from "./TaskFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskFormSkeleton",
  component: TaskFormSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskFormSkeleton>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
