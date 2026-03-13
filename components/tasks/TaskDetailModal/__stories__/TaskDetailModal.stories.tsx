import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailModal } from "../TaskDetailModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { TaskDetail, TaskDetailSkeleton } from "../../TaskDetail";
import { NewSubtaskModal } from "@/components/subtasks/NewSubtaskModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskContext/__stories__";

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

          <NewSubtaskModal taskId={1} />
        </DialogTrigger>
      );
    },
    withCreateSubtaskProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
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
        subtasksList={<SubtaskList {...SubtaskListStory.args} />}
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
      />
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
