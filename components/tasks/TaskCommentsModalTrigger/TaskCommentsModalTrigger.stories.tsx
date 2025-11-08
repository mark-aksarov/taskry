import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModalTrigger } from "./TaskCommentsModalTrigger";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/tasks/TaskCommentsModalTrigger",
  component: TaskCommentsModalTrigger,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof TaskCommentsModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    commentCount: 25,
    taskId: 1,
  },
} satisfies Story;
