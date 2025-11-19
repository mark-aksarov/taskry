import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailModal } from "./TaskDetailModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  withTaskDetail,
  withTaskDetailSkeleton,
} from "@/components/tasks/TaskDetailClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";

const meta = {
  title: "components/tasks/TaskDetailModal",
  component: TaskDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Task detail" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
  args: {
    taskId: 1,
  },
} satisfies Meta<typeof TaskDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  decorators: [withTaskDetail, withTaskComments],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [withTaskDetailSkeleton, withTaskComments],
} satisfies Story;
