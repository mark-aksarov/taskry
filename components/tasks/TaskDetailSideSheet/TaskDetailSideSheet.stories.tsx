import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailSideSheet } from "./TaskDetailSideSheet";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { TaskDetail, TaskDetailSkeleton } from "../TaskDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";

const meta = {
  title: "components/tasks/TaskDetailSideSheet",
  component: TaskDetailSideSheet,
  decorators: [
    withOpenModal,
    withCreateSubtaskProvider,
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
        subtasksList={<SubtaskList {...SubtaskListStory.args} />}
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
