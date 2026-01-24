import { Button } from "@/components/ui/Button";
import { TaskDetailModal } from "./TaskDetailModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetail, TaskDetailSkeleton } from "../TaskDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";

const meta = {
  title: "components/tasks/TaskDetailModal",
  component: TaskDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Task detail" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
    taskDetailContainer: <TaskDetail {...TaskDetailStory.args} />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    taskId: 1,
    taskDetailContainer: <TaskDetailSkeleton />,
  },
} satisfies Story;
