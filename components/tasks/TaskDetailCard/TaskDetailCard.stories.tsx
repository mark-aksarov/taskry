import {
  TaskDetailCardHeader,
  TaskDetailCardHeaderSkeleton,
} from "./TaskDetailCardHeader";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailCard } from "./TaskDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListRichStory } from "@/components/subtasks/SubtaskList/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";
import { withUpdateTaskTitleProvider } from "@/components/tasks/UpdateTaskTitleProvider/__stories__";
import { withUpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskProjectProvider } from "@/components/tasks/UpdateTaskProjectProvider/__stories__";
import { withUpdateTaskDeadlineProvider } from "@/components/tasks/UpdateTaskDeadlineProvider/__stories__";
import { withUpdateTaskAssigneeProvider } from "@/components/tasks/UpdateTaskAssigneeProvider/__stories__";
import { withUpdateTaskStatusAltProvider } from "@/components/tasks/UpdateTaskStatusAltProvider/__stories__";
import { withUpdateTaskDescriptionProvider } from "@/components/tasks/UpdateTaskDescriptionProvider/__stories__";
import { withUpdateTaskCategoryRelProvider } from "@/components/tasks/UpdateTaskCategoryRelProvider/__stories__";

const meta = {
  title: "components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [
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
        subtasksList={<SubtaskList {...SubtaskListRichStory.args} />}
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
        progress={75}
      />
    ),
  },
} satisfies Story;
