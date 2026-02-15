import { TaskStatus } from "@/generated/prisma/enums";
import { UserTaskListItem } from "../UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { UserItemActionMenuTrigger } from "../../UserItemActionMenuTrigger";
import { TaskDetailModalStory } from "@/components/tasks/TaskDetailModal/__stories__";
import { TaskCommentsModalStory } from "@/components/tasks/TaskCommentsModal/__stories__";
import { UserItemActionMenuTriggerStory } from "../../UserItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/users/UserTaskListItem",
  component: UserTaskListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Task 1",
    deadline: new Date("2025-09-30"),
    status: TaskStatus.pending,
    commentsCount: 10,
    taskDetailModal: <TaskDetailModal {...TaskDetailModalStory.args} />,
    menuTrigger: (
      <UserItemActionMenuTrigger {...UserItemActionMenuTriggerStory.args} />
    ),
    taskCommentsModal: <TaskCommentsModal {...TaskCommentsModalStory.args} />,
    updateTaskStatus: () => {
      return new Promise((res) =>
        setTimeout(() => res({ status: "success" }), 500),
      );
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
