import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtasksEmptySection } from "./SubtasksEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/subtasks/SubtasksEmptySection",
  component: SubtasksEmptySection,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
    layout: "centered",
  },
} satisfies Meta<typeof SubtasksEmptySection>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
