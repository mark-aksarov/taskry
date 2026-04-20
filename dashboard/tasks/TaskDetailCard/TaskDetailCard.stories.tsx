import {
  TaskDetailCardHeader,
  TaskDetailCardHeaderSkeleton,
} from "./TaskDetailCardHeader";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailCard } from "./TaskDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTaskProvider } from "../DeleteTaskProvider/__stories__";
import { SubtaskListExample } from "@/dashboard/subtasks/SubtaskList/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withCreateSubtaskProvider } from "@/dashboard/subtasks/CreateSubtaskProvider/__stories__";
import { withUpdateTaskTitleProvider } from "@/dashboard/tasks/UpdateTaskTitleProvider/__stories__";
import { withUpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskProjectProvider } from "@/dashboard/tasks/UpdateTaskProjectProvider/__stories__";
import { withUpdateTaskDeadlineProvider } from "@/dashboard/tasks/UpdateTaskDeadlineProvider/__stories__";
import { withUpdateTaskAssigneeProvider } from "@/dashboard/tasks/UpdateTaskAssigneeProvider/__stories__";
import { withUpdateTaskStatusAltProvider } from "@/dashboard/tasks/UpdateTaskStatusAltProvider/__stories__";
import { withUpdateTaskDescriptionProvider } from "@/dashboard/tasks/UpdateTaskDescriptionProvider/__stories__";
import { withUpdateTaskCategoryRelProvider } from "@/dashboard/tasks/UpdateTaskCategoryRelProvider/__stories__";

const meta = {
  title: "components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [
    withDeleteTaskProvider,
    withUpdateTaskProjectProvider,
    withUpdateTaskCategoryRelProvider,
    withUpdateTaskAssigneeProvider,
    withUpdateTaskStatusAltProvider,
    withUpdateTaskDeadlineProvider,
    withUpdateTaskDescriptionProvider,
    withUpdateTaskTitleProvider,
    withUpdateTaskStatusProvider,
    withCreateSubtaskProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskDetailCardHeaderContainer: (
      <TaskDetailCardHeader
        taskStatus={mockedTaskDetail.status}
        taskDeadline={mockedTaskDetail.deadline}
      />
    ),
    taskDetailContainer: (
      <TaskDetailAlt
        {...mockedTaskDetail}
        progress={75}
        subtasksList={<SubtaskListExample variant="rich" showActionMenu />}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    taskDetailCardHeaderContainer: <TaskDetailCardHeaderSkeleton />,
    taskDetailContainer: <TaskDetailAltSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    taskDetailContainer: (
      <TaskDetailAlt
        title={mockedTaskDetail.title}
        deadline={mockedTaskDetail.deadline}
        status={mockedTaskDetail.status}
        progress={0}
      />
    ),
  },
} satisfies Story;
