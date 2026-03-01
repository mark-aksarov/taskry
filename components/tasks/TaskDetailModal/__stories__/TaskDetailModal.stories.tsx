import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailModal } from "../TaskDetailModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getSubtasksList } from "../../TaskDetail/__stories__";
import { TaskDetail, TaskDetailSkeleton } from "../../TaskDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskDetailModal",
  component: TaskDetailModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Task detail" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskDetail;

export const Default = {
  args: {
    taskId: 1,
    taskDetailContainer: (
      <TaskDetail
        {...task}
        subtasksList={getSubtasksList()}
        mutate={() => {}}
        createSubtask={() => ({ status: "success" })}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    taskId: 1,
    taskDetailContainer: <TaskDetailSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    taskId: 1,
    taskDetailContainer: (
      <TaskDetail
        id={task.id}
        title={task.title}
        status={task.status}
        deadline={task.deadline}
        project={task.project}
        mutate={() => {}}
        createSubtask={() => ({ status: "success" })}
      />
    ),
  },
};
