import {
  TaskDetailActions,
  TaskDetailActionsSkeleton,
} from "../TaskDetailActions";

import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailCard } from "./TaskDetailCard";
import { TaskDetailHeader } from "../TaskDetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTaskProvider } from "../DeleteTaskProvider/__stories__";
import { withUpdateTaskProvider } from "../UpdateTaskProvider/__stories__";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [
    withUpdateTaskProvider,
    withDeleteTaskProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskDetailContainer: (
      <TaskDetailAlt
        {...mockedTaskDetail}
        subtasksList={<SubtaskList {...SubtaskListStory.args} />}
      />
    ),
    taskDetailHeaderContainer: (
      <TaskDetailHeader
        taskTitle={mockedTaskDetail.title}
        categoryName={mockedTaskDetail.category?.name}
      />
    ),
    taskDetailActions: <TaskDetailActions />,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    taskDetailContainer: <TaskDetailAltSkeleton />,
    taskDetailHeaderContainer: <DetailHeaderSkeleton />,
    taskDetailActions: <TaskDetailActionsSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    taskDetailContainer: (
      <TaskDetailAlt
        deadline={mockedTaskDetail.deadline}
        status={mockedTaskDetail.status}
      />
    ),
    taskDetailHeaderContainer: (
      <TaskDetailHeader taskTitle={mockedTaskDetail.title} />
    ),
    taskDetailActions: <TaskDetailActions />,
  },
} satisfies Story;
