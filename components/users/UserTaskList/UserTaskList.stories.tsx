import { fn } from "storybook/test";
import { UserTaskList } from "./UserTaskList";
import type { Meta, StoryObj } from "@storybook/react";
import { UserTaskListItem } from "../UserTaskListItem";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";

const mockedTasks = [
  {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    status: TaskStatus.pending,
    commentsCount: 10,
  },
  {
    id: 2,
    title: "Implement login system",
    deadline: new Date("2025-10-05"),
    status: TaskStatus.active,
    commentsCount: 22,
  },
  {
    id: 3,
    title: "Database schema migration",
    deadline: new Date("2025-10-10"),
    status: TaskStatus.completed,
    commentsCount: 2,
  },
  {
    id: 4,
    title: "Write unit tests",
    deadline: new Date("2025-10-12"),
    status: TaskStatus.pending,
    commentsCount: 12,
  },
  {
    id: 5,
    title: "Prepare deployment pipeline",
    deadline: new Date("2025-10-15"),
    status: TaskStatus.active,
    commentsCount: 15,
  },
  {
    id: 6,
    title: "Set up staging environment",
    deadline: new Date("2025-10-18"),
    status: TaskStatus.completed,
    commentsCount: 9,
  },
  {
    id: 7,
    title: "Create onboarding flow",
    deadline: new Date("2025-10-20"),
    status: TaskStatus.completed,
    commentsCount: 12,
  },
  {
    id: 8,
    title: "Fix payment bug",
    deadline: new Date("2025-10-22"),
    status: TaskStatus.active,
    commentsCount: 10,
  },
  {
    id: 9,
    title: "Optimize image loading",
    deadline: new Date("2025-10-25"),
    status: TaskStatus.pending,
    commentsCount: 23,
  },
  {
    id: 10,
    title: "Refactor auth middleware",
    deadline: new Date("2025-10-28"),
    status: TaskStatus.completed,
    commentsCount: 13,
  },
];

const meta = {
  title: "Components/users/UserTaskList",
  component: UserTaskList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserTaskList>;

export default meta;
type Story = StoryObj<typeof UserTaskList>;

export const Default = {
  args: {
    children: mockedTasks.map((task) => (
      <UserTaskListItem
        key={task.id}
        {...task}
        projectStatus={ProjectStatus.active}
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
            projectStatus={ProjectStatus.active}
            canDelete={true}
            canUpdate={true}
            canUpdateStatus={true}
            deleteAction={fn()}
            updateStatusAction={fn()}
          />
        }
      />
    )),
  },
} satisfies Story;
