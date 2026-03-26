import { TaskDetail } from "../../TaskDetail";
import { TaskListItem } from "../TaskListItem";
import { UpdateTaskForm } from "../../UpdateTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail } from "@/components/users/UserDetail";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { CommentList } from "@/components/comments/CommentList";
import { mockedTaskDetail, mockedTaskList } from "@/mocks/tasks";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { mockedUserDetail, mockedUserSummaries } from "@/mocks/users";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTasksProvider } from "../../DeleteTasksContext/__stories__";
import { mockedProjectDetail, mockedProjectSummaries } from "@/mocks/projects";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { MockedTaskDetailProviders } from "../../TaskDetailProviders/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext/__stories__";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";

const meta = {
  title: "components/tasks/TaskListItem",
  component: TaskListItem,
  decorators: [
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskList[0];

export const Default = {
  args: {
    ...task,
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
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        imageUrl={mockedUserDetail.imageUrl}
        positionName={mockedUserDetail.position.name}
      />
    ),
    projectDetailContainer: <ProjectDetail {...mockedProjectDetail} />,
    taskDetailContainer: (
      <MockedTaskDetailProviders>
        <TaskDetail
          {...mockedTaskDetail}
          subtasksList={<SubtaskList {...SubtaskListStory.args} />}
        />

        <CreateSubtaskModal taskId={mockedTaskDetail.id} />
      </MockedTaskDetailProviders>
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
    project: {
      ...Default.args.project,
      title: "This is a project title with a very long text for layout testing",
    },
    category: {
      ...Default.args.category,
      name: "This is a category name with a very long text for layout testing",
    },
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    ...Default.args,
    showCheckbox: true,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    assignee: undefined,
    project: undefined,
    category: undefined,
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: "active",
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: "completed",
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
