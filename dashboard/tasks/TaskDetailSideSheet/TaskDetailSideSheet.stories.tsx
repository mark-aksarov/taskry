import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { mockedTaskDetail } from "@/mocks/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailSideSheet } from "./TaskDetailSideSheet";
import { TaskDetail, TaskDetailSkeleton } from "../TaskDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTaskProvider } from "../DeleteTaskProvider/__stories__";
import { SubtaskListExample } from "@/dashboard/subtasks/SubtaskList/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";

const meta = {
  title: "dashboard/tasks/TaskDetailSideSheet",
  component: TaskDetailSideSheet,
  decorators: [
    withOpenModal,
    withDeleteTaskProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "taskDetail",
  },
} satisfies Meta<typeof TaskDetailSideSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskDetail;

export const Default = {
  args: {
    taskId: task.id,
    taskDetailContainer: (
      <TaskDetail
        {...task}
        subtasksList={
          <SubtaskListExample variant="plain" showActionMenu={false} />
        }
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    taskId: task.id,
    taskDetailContainer: <TaskDetailSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    taskId: task.id,
    taskDetailContainer: (
      <TaskDetail
        title={task.title}
        status={task.status}
        deadline={task.deadline}
      />
    ),
  },
} satisfies Story;
