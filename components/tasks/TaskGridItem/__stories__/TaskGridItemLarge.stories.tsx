import { TaskDetail } from "../../TaskDetail";
import { mockedTaskList } from "@/mocks/tasks";
import { mockedTaskDetail } from "@/mocks/tasks";
import { UpdateTaskForm } from "../../UpdateTaskForm";
import { TaskStatus } from "@/generated/prisma/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemLarge } from "../TaskGridItemLarge";
import { mockedProjectSummaries } from "@/mocks/projects";
import { UserDetail } from "@/components/users/UserDetail";
import { CommentList } from "@/components/comments/CommentList";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { mockedUserDetail, mockedUserSummaries } from "@/mocks/users";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTasksProvider } from "../../DeleteTasksContext/__stories__";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { MockedTaskDetailProviders } from "../../TaskDetailProviders/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext/__stories__";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";

const meta = {
  title: "components/tasks/TaskGridItemLarge",
  component: TaskGridItemLarge,
  decorators: [
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskGridItemLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedTask = mockedTaskList[0];

export const Default = {
  args: {
    ...mockedTask,
    subtasksTotal: mockedTask.subtasks.total,
    subtasksDone: mockedTask.subtasks.done,
    taskCommentsContainer: <CommentList {...CommentListStory.args} />,
    updateTaskFormContainer: (
      <UpdateTaskForm
        {...mockedTaskDetail}
        taskId={mockedTaskDetail.id}
        taskCategorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
    taskDetailContainer: (
      <MockedTaskDetailProviders>
        <TaskDetail
          {...mockedTaskDetail}
          subtasksList={<SubtaskList {...SubtaskListStory.args} />}
        />

        <CreateSubtaskModal taskId={mockedTaskDetail.id} />
      </MockedTaskDetailProviders>
    ),
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
      />
    ),
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
    updateTask: () => ({ status: "success" }),
    deleteTask: () => ({ status: "success" }),
    updateTaskStatus: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    title: "This is a task title with a very long text for layout testing",
    assignee: {
      ...Default.args.assignee!,
      fullName: "This is a user name with a very long text for layout testing",
    },
  },
} satisfies Story;

export const WithoutAssignee = {
  args: {
    ...Default.args,
    assignee: undefined,
  },
} satisfies Story;

export const WithoutAssigneeImage = {
  args: {
    ...Default.args,
    assignee: {
      id: "user-3",
      fullName: "User 3",
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: TaskStatus.active,
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: TaskStatus.completed,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
