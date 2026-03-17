import {
  TaskDetailActions,
  TaskDetailActionsSkeleton,
} from "../TaskDetailActions";

import { EditTaskForm } from "../EditTaskForm";
import { EditTaskModal } from "../EditTaskModal";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailCard } from "./TaskDetailCard";
import { mockedUserSummaries } from "@/mocks/users";
import { TaskDetailHeader } from "../TaskDetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { CommentList } from "@/components/comments/CommentList";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { NewSubtaskModal } from "@/components/subtasks/NewSubtaskModal";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTaskProvider } from "../DeleteTaskContext/__stories__";
import { withUpdateTaskProvider } from "../UpdateTaskContext/__stories__";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskContext/__stories__";

const meta = {
  title: "components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [
    (Story) => (
      <>
        <Story />
        <EditTaskModal
          editTaskFormContainer={
            <EditTaskForm
              {...mockedTaskDetail}
              taskId={mockedTaskDetail.id}
              taskCategorySelectItems={mockedTaskCategorySummaries}
              projectSelectItems={mockedProjectSummaries}
              assigneeSelectItems={mockedUserSummaries}
            />
          }
        />
        <NewSubtaskModal taskId={mockedTaskDetail.id} />
      </>
    ),
    withUpdateTaskProvider,
    withDeleteTaskProvider,
    withCreateSubtaskProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
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
    taskDetailActions: (
      <TaskDetailActions
        taskId={mockedTaskDetail.id}
        taskTitle={mockedTaskDetail.title}
        taskCommentsContainer={<CommentList {...CommentListStory.args} />}
        sendComment={() => ({ status: "success" })}
        updateComment={() => ({ status: "success" })}
      />
    ),
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
        id={mockedTaskDetail.id}
        deadline={mockedTaskDetail.deadline}
        status={mockedTaskDetail.status}
      />
    ),
    taskDetailHeaderContainer: (
      <TaskDetailHeader taskTitle={mockedTaskDetail.title} />
    ),
    taskDetailActions: (
      <TaskDetailActions
        taskId={mockedTaskDetail.id}
        taskTitle={mockedTaskDetail.title}
        sendComment={() => ({ status: "success" })}
        updateComment={() => ({ status: "success" })}
        taskCommentsContainer={<CommentList {...CommentListStory.args} />}
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
