import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailModal } from "./TaskDetailModal";
import { TaskInfo } from "../TaskInfo";
import { taskDetailMock } from "@/lib/data/__mocks__/tasks";
import { Button, RACDialogTrigger } from "@/components/ui";

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
  ],
  args: {
    children: (
      <TaskInfo
        taskPromise={new Promise((resolve) => resolve(taskDetailMock))}
      />
    ),
  },
} satisfies Meta<typeof TaskDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
