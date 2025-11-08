import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetail } from "./TaskDetail";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "components/tasks/TaskDetail",
  component: TaskDetail,
  tags: ["autodocs"],
  args: {
    taskId: 1,
  },
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof TaskDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
