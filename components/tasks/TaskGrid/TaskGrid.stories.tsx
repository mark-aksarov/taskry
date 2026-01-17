import { fn } from "storybook/test";
import { TaskGrid } from "./TaskGrid";
import { TaskGridItem } from "../TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";

const meta = {
  title: "Components/tasks/TaskGrid",
  component: TaskGrid,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskGrid>;

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
    title: "Design homepage",
    deadline: "2025-09-28",
    status: TaskStatus.active,
    assignee: { id: "user1", imageUrl: "/man.jpg", fullName: "Liam Turner" },
    commentsCount: 99,
    total: 3,
    done: 1,
  },
  {
    id: 2,
    title: "Implement authentication",
    deadline: "2025-10-06",
    status: TaskStatus.active,
    assignee: undefined,
    commentsCount: 10,
    total: 4,
    done: 2,
  },
  {
    id: 3,
    title: "Migrate database schema",
    deadline: "2025-10-11",
    status: TaskStatus.pending,
    assignee: { id: "user3", imageUrl: undefined, fullName: "Olivia White" },
    commentsCount: 6,
    total: 2,
    done: 2,
  },
  {
    id: 4,
    title: "Write automated tests",
    deadline: "2025-10-13",
    status: TaskStatus.completed,
    assignee: { id: "user4", imageUrl: "/man.jpg", fullName: "Ethan Green" },
    commentsCount: 25,
    total: 4,
    done: 2,
  },
  {
    id: 5,
    title: "Setup CI/CD pipeline",
    deadline: "2025-10-16",
    status: TaskStatus.pending,
    assignee: { id: "user5", imageUrl: "/man.jpg", fullName: "Mason Moore" },
    commentsCount: 99,
    total: 4,
    done: 3,
  },
  {
    id: 6,
    title: "Setup staging environment",
    deadline: "2025-10-19",
    status: TaskStatus.active,
    assignee: { id: "user6", imageUrl: "/man.jpg", fullName: "Ava Black" },
    commentsCount: 99,
    total: 3,
    done: 3,
  },
  {
    id: 7,
    title: "Design onboarding flow",
    deadline: "2025-10-21",
    status: TaskStatus.completed,
    assignee: { id: "user7", imageUrl: "/man.jpg", fullName: "Isabella Hall" },
    commentsCount: 47,
    total: 3,
    done: 3,
  },
  {
    id: 8,
    title: "Fix checkout bug",
    deadline: "2025-10-23",
    status: TaskStatus.pending,
    assignee: { id: "user8", imageUrl: "/man.jpg", fullName: "Henry Young" },
    commentsCount: 18,
    total: 3,
    done: 1,
  },
  {
    id: 9,
    title: "Optimize image loading",
    deadline: "2025-10-26",
    status: TaskStatus.pending,
    assignee: { id: "user9", imageUrl: undefined, fullName: "Ivy Adams" },
    commentsCount: 67,
    total: 3,
    done: 1,
  },
  {
    id: 10,
    title: "Refactor authentication middleware",
    deadline: "2025-10-29",
    status: TaskStatus.active,
    assignee: undefined,
    commentsCount: 87,
    total: 3,
    done: 2,
  },
];

export const Default = {
  args: {
    children: (
      <>
        {mockedTasks.map((task) => (
          <TaskGridItem
            key={task.id}
            id={task.id}
            title={task.title}
            deadline={new Date(task.deadline)}
            assignee={task.assignee}
            status={task.status}
            subtasksTotal={task.total}
            subtasksDone={task.done}
            projectStatus={ProjectStatus.active}
            commentModalTrigger={
              <TaskCommentsModalTrigger
                taskId={1}
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
                projectStatus={ProjectStatus.active}
                canDelete
                canUpdate
                canUpdateStatus
                deleteAction={mockedAction}
                updateStatusAction={mockedAction}
                className="-mr-2"
              />
            }
          />
        ))}
      </>
    ),
  },
} satisfies Story;
