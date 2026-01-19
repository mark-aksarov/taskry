import { fn } from "storybook/test";
import { TaskList } from "./TaskList";
import { TaskListItem } from "../TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";

const meta = {
  title: "Components/tasks/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  excludeStories: ["getTaskListItems"],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedAction = () => {
  return new Promise(() => ({
    status: "success",
    message: null,
  })) as any;
};

const mockedTasks = [
  {
    id: 1,
    title: "Design landing page",
    deadline: "2025-09-30",
    project: "Website Redesign",
    category: "Design",
    status: TaskStatus.pending,
    commentsCount: 10,
    assignee: { id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" },
  },
  {
    id: 2,
    title: "Implement login system",
    deadline: "2025-10-05",
    project: "Authentication Module",
    category: "Development",
    status: TaskStatus.active,
    commentsCount: 22,
  },
  {
    id: 3,
    title: "Database schema migration",
    deadline: "2025-10-10",
    project: "Core Database Upgrade",
    category: "Backend",
    status: TaskStatus.completed,
    commentsCount: 2,
    assignee: { id: "user3", fullName: "Jane Doe" },
  },
  {
    id: 4,
    title: "Write unit tests",
    deadline: "2025-10-12",
    project: "Quality Assurance Suite",
    category: "Testing",
    status: TaskStatus.pending,
    commentsCount: 12,
    assignee: { id: "user4", imageUrl: "/man.jpg", fullName: "John Doe" },
  },
  {
    id: 5,
    title: "Prepare deployment pipeline",
    deadline: "2025-10-15",
    project: "CI/CD Automation",
    category: "DevOps",
    status: TaskStatus.active,
    commentsCount: 15,
    assignee: { id: "user5", imageUrl: "/man.jpg", fullName: "John Doe" },
  },
  {
    id: 6,
    title: "Set up staging environment",
    deadline: "2025-10-18",
    project: "Infrastructure Setup",
    category: "Infrastructure",
    status: TaskStatus.completed,
    commentsCount: 9,
    assignee: { id: "user6", imageUrl: "/man.jpg", fullName: "John Doe" },
  },
  {
    id: 7,
    title: "Create onboarding flow",
    deadline: "2025-10-20",
    project: "User Experience Improvements",
    category: "UX",
    status: TaskStatus.completed,
    commentsCount: 12,
    assignee: { id: "user7", imageUrl: "/man.jpg", fullName: "John Doe" },
  },
  {
    id: 8,
    title: "Fix payment bug",
    deadline: "2025-10-22",
    project: "E-commerce Platform",
    category: "Bugfix",
    status: TaskStatus.active,
    commentsCount: 10,
    assignee: { id: "user8", imageUrl: "/man.jpg", fullName: "John Doe" },
  },
  {
    id: 9,
    title: "Optimize image loading",
    deadline: "2025-10-25",
    project: "Performance Optimization",
    category: "Performance",
    status: TaskStatus.pending,
    commentsCount: 23,
    assignee: { id: "user9", fullName: "Jane Doe" },
  },
  {
    id: 10,
    title: "Refactor auth middleware",
    deadline: "2025-10-28",
    project: "Backend Refactoring",
    category: "Backend",
    status: TaskStatus.completed,
    commentsCount: 13,
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
      id={task.id}
      title={task.title}
      deadline={new Date(task.deadline)}
      status={task.status}
      assignee={task.assignee}
      project={{
        id: task.id,
        title: task.project,
      }}
      category={{ id: task.id, name: task.category }}
      showCheckbox={showCheckbox}
      commentModalTrigger={
        <TaskCommentsModalTrigger
          taskId={task.id}
          commentsCount={task.commentsCount}
          sendCommentAction={fn()}
        />
      }
      menuTrigger={
        <TaskItemActionMenuTrigger
          guestMode={false}
          taskId={task.id}
          taskTitle={task.title}
          taskStatus={task.status}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
      }
    />
  ));

export const Default = {
  args: {
    showCheckbox: true,
    children: getTaskListItems({ showCheckbox: true }),
  },
} satisfies Story;
