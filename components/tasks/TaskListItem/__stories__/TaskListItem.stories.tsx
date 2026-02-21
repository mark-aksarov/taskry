import { TaskListItem } from "../TaskListItem";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskDetailModal } from "../../TaskDetailModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModal } from "../../TaskCommentsModal";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskDetailModalStory } from "../../TaskDetailModal/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../../TaskItemActionMenuTrigger";
import { TaskCommentsModalStory } from "../../TaskCommentsModal/__stories__";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { withDeleteTaskModalProvider } from "../../DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { UserDetailModalStory } from "@/components/users/UserDetailModal/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusContext/__stories__";
import { TaskItemActionMenuTriggerStory } from "../../TaskItemActionMenuTrigger/__stories__";
import { ProjectDetailModalStory } from "@/components/projects/ProjectDetailModal/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

export const mockedTask = {
  id: 1,
  title: "Task 1",
  description: "Task description. General information goes here.",
  deadline: "2025-09-30",
  assignee: {
    id: "user1",
    imageUrl: "/man.jpg",
    fullName: "User 1",
  },
  category: {
    id: 1,
    name: "Category 1",
  },
  project: {
    id: 1,
    title: "Project 1",
  },
  status: TaskStatus.pending,
  subtasksTotal: 6,
  subtasksDone: 2,
  commentsCount: 5,
};

const meta = {
  title: "components/tasks/TaskListItem",
  component: TaskListItem,
  decorators: [
    withSelectedTasksProvider,
    withDeleteTaskModalProvider,
    withDeleteCommentModalProvider,
    withUpdateTaskStatusesProvider,
    withThemedBackground,
  ],
  excludeStories: ["mockedTask"],
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedTask,
    taskDetailModal: <TaskDetailModal {...TaskDetailModalStory.args} />,
    userDetailModal: <UserDetailModal {...UserDetailModalStory.args} />,
    projectDetailModal: (
      <ProjectDetailModal {...ProjectDetailModalStory.args} />
    ),
    taskCommentsModal: <TaskCommentsModal {...TaskCommentsModalStory.args} />,
    menuTrigger: (
      <TaskItemActionMenuTrigger {...TaskItemActionMenuTriggerStory.args} />
    ),
    updateTaskStatus: () => {
      return new Promise((res) =>
        setTimeout(() => res({ status: "success" }), 500),
      );
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
