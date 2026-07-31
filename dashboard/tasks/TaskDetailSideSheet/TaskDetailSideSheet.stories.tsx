import { subDays } from "date-fns";
import { mockedTaskDetail } from "@/mocks/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { TaskDetailSideSheet } from "./TaskDetailSideSheet";
import { TaskDetail, TaskDetailSkeleton } from "../TaskDetail";
import { SubtaskListExample } from "@/dashboard/subtasks/SubtaskList/__stories__";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskDetailSideSheet",
  component: TaskDetailSideSheet,
  decorators: [withOpenModal, withDashboardLayoutProviders],
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

export const WithOverdueDeadline = {
  args: {
    taskId: task.id,
    taskDetailContainer: (
      <TaskDetail
        {...task}
        subtasksList={
          <SubtaskListExample variant="plain" showActionMenu={false} />
        }
        deadline={subDays(new Date(), 3).toISOString()}
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
