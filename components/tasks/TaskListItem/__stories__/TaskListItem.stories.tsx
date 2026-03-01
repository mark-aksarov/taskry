import { TaskDetail } from "../../TaskDetail";
import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../TaskListItem";
import { mockedUserDetail } from "@/mocks/users";
import { EditTaskForm } from "../../EditTaskForm";
import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail } from "@/components/users/UserDetail";
import { taskDetailArgs } from "../../TaskDetail/__stories__";
import { editTaskFormArgs } from "../../EditTaskForm/__stories__";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";

const meta = {
  title: "components/tasks/TaskListItem",
  component: TaskListItem,
  decorators: [withSelectedTasksProvider, withThemedBackground],
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskList[0];

export const Default = {
  args: {
    ...task,
    taskCommentsContainer: getCommentList(),
    editTaskFormContainer: <EditTaskForm {...editTaskFormArgs} />,
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    projectDetailContainer: <ProjectDetail {...mockedProjectDetail} />,
    taskDetailContainer: <TaskDetail {...taskDetailArgs} />,
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
    updateTaskStatus: () => {
      return new Promise((res) =>
        setTimeout(() => res({ status: "success" }), 500),
      );
    },
    deleteTask: () => ({ status: "success" }),
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
      id: "user-1",
      fullName: "User 1",
      imageUrl: undefined,
    },
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
