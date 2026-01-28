import { fn } from "storybook/test";
import { TaskList } from "./TaskList";
import { TaskListItem } from "../TaskListItem";
import { TaskFormBase } from "../TaskFormBase";
import { TaskDetailModal } from "../TaskDetailModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { Default as TaskFormBaseStory } from "../TaskFormBase/TaskFormBase.stories";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { Default as TaskDetailModalStory } from "../TaskDetailModal/TaskDetailModal.stories";
import { Default as UserDetailModalStory } from "@/components/users/UserDetailModal/UserDetailModal.stories";
import { Default as TaskDetailBottomSheetStory } from "../TaskDetailBottomSheet/TaskDetailBottomSheet.stories";
import { Default as ProjectDetailModalStory } from "@/components/projects/ProjectDetailModal/ProjectDetailModal.stories";

const meta = {
  title: "Components/tasks/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  excludeStories: ["getTaskListItems", "mockedTasks"],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const mockedTasks = [
  {
    id: 1,
    title: "Design landing page",
    status: TaskStatus.pending,
    deadline: new Date("2025-09-30"),
    commentsCount: 10,
    assignee: {
      id: "user1",
      fullName: "John Doe",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 1,
      title: "Website Redesign",
      status: ProjectStatus.active,
    },
    category: {
      id: 1,
      name: "Design",
    },
    subtasks: { total: 5, done: 2 },
  },
  {
    id: 2,
    title: "Implement login system",
    status: TaskStatus.active,
    deadline: new Date("2025-10-05"),
    commentsCount: 22,
    project: {
      id: 2,
      title: "Authentication Module",
      status: ProjectStatus.active,
    },
    category: {
      id: 2,
      name: "Development",
    },
    subtasks: { total: 8, done: 3 },
  },
  {
    id: 3,
    title: "Database schema migration",
    status: TaskStatus.completed,
    deadline: new Date("2025-10-10"),
    commentsCount: 2,
    assignee: {
      id: "user3",
      fullName: "Jane Doe",
    },
    project: {
      id: 3,
      title: "Core Database Upgrade",
      status: ProjectStatus.completed,
    },
    category: {
      id: 3,
      name: "Backend",
    },
    subtasks: { total: 4, done: 4 },
  },
  {
    id: 4,
    title: "Write unit tests",
    status: TaskStatus.pending,
    deadline: new Date("2025-10-12"),
    commentsCount: 12,
    assignee: {
      id: "user4",
      fullName: "John Doe",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 4,
      title: "Quality Assurance Suite",
      status: ProjectStatus.active,
    },
    category: {
      id: 4,
      name: "Testing",
    },
    subtasks: { total: 6, done: 1 },
  },
  {
    id: 5,
    title: "Prepare deployment pipeline",
    status: TaskStatus.active,
    deadline: new Date("2025-10-15"),
    commentsCount: 15,
    assignee: {
      id: "user5",
      fullName: "John Doe",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 5,
      title: "CI/CD Automation",
      status: ProjectStatus.active,
    },
    category: {
      id: 5,
      name: "DevOps",
    },
    subtasks: { total: 7, done: 4 },
  },
  {
    id: 6,
    title: "Set up staging environment",
    status: TaskStatus.completed,
    deadline: new Date("2025-10-18"),
    commentsCount: 9,
    assignee: {
      id: "user6",
      fullName: "John Doe",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 6,
      title: "Infrastructure Setup",
      status: ProjectStatus.completed,
    },
    category: {
      id: 6,
      name: "Infrastructure",
    },
    subtasks: { total: 3, done: 3 },
  },
  {
    id: 7,
    title: "Create onboarding flow",
    status: TaskStatus.completed,
    deadline: new Date("2025-10-20"),
    commentsCount: 12,
    assignee: {
      id: "user7",
      fullName: "John Doe",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 7,
      title: "User Experience Improvements",
      status: ProjectStatus.completed,
    },
    category: {
      id: 7,
      name: "UX",
    },
    subtasks: { total: 5, done: 5 },
  },
  {
    id: 8,
    title: "Fix payment bug",
    status: TaskStatus.active,
    deadline: new Date("2025-10-22"),
    commentsCount: 10,
    assignee: {
      id: "user8",
      fullName: "John Doe",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 8,
      title: "E-commerce Platform",
      status: ProjectStatus.active,
    },
    category: {
      id: 8,
      name: "Bugfix",
    },
    subtasks: { total: 2, done: 1 },
  },
  {
    id: 9,
    title: "Optimize image loading",
    status: TaskStatus.pending,
    deadline: new Date("2025-10-25"),
    commentsCount: 23,
    assignee: {
      id: "user9",
      fullName: "Jane Doe",
    },
    project: {
      id: 9,
      title: "Performance Optimization",
      status: ProjectStatus.active,
    },
    category: {
      id: 9,
      name: "Performance",
    },
    subtasks: { total: 6, done: 2 },
  },
  {
    id: 10,
    title: "Refactor auth middleware",
    status: TaskStatus.completed,
    deadline: new Date("2025-10-28"),
    commentsCount: 13,
    project: {
      id: 10,
      title: "Backend Refactoring",
      status: ProjectStatus.completed,
    },
    category: {
      id: 10,
      name: "Backend",
    },
    subtasks: { total: 4, done: 4 },
  },
];

export const getTaskListItems = ({
  showCheckbox,
}: {
  showCheckbox?: boolean;
}) =>
  mockedTasks.map((task) => (
    <TaskListItem
      key={task.id}
      {...task}
      showCheckbox={showCheckbox}
      commentModalTrigger={
        <TaskCommentsModalTrigger
          taskId={1}
          commentsCount={10}
          taskCommentsContainer={<MockedCommentsContainer />}
          sendCommentAction={fn()}
          updateCommentAction={fn()}
        />
      }
      menuTrigger={
        <TaskItemActionMenuTrigger
          guestMode={false}
          taskId={task.id}
          taskTitle={task.title}
          taskStatus={task.status}
          deleteAction={fn()}
          updateStatusAction={fn()}
          editTaskFormContainer={<TaskFormBase {...TaskFormBaseStory.args} />}
        />
      }
      taskDetailModal={<TaskDetailModal {...TaskDetailModalStory.args} />}
      taskDetailBottomSheet={
        <TaskDetailBottomSheet {...TaskDetailBottomSheetStory.args} />
      }
      userDetailModal={<UserDetailModal {...UserDetailModalStory.args} />}
      projectDetailModal={
        <ProjectDetailModal {...ProjectDetailModalStory.args} />
      }
    />
  ));

export const Default = {
  args: {
    showCheckbox: true,
    children: getTaskListItems({ showCheckbox: true }),
  },
} satisfies Story;
