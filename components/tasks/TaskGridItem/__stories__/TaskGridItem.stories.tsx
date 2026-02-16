import { TaskGridItem } from "../TaskGridItem";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskDetailModal } from "../../TaskDetailModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModal } from "../../TaskCommentsModal";
import { mockedTask } from "../../TaskListItem/__stories__";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskDetailModalStory } from "../../TaskDetailModal/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../../TaskItemActionMenuTrigger";
import { TaskCommentsModalStory } from "../../TaskCommentsModal/__stories__";
import { withDeleteTaskModalProvider } from "../../DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { UserDetailModalStory } from "@/components/users/UserDetailModal/__stories__";
import { TaskItemActionMenuTriggerStory } from "../../TaskItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/tasks/TaskGridItem",
  component: TaskGridItem,
  decorators: [
    withSelectedTasksProvider,
    withDeleteTaskModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedTask,
    taskDetailModal: <TaskDetailModal {...TaskDetailModalStory.args} />,
    userDetailModal: <UserDetailModal {...UserDetailModalStory.args} />,
    taskCommentsModal: <TaskCommentsModal {...TaskCommentsModalStory.args} />,
    menuTrigger: (
      <TaskItemActionMenuTrigger
        {...TaskItemActionMenuTriggerStory.args}
        className="-mr-2"
      />
    ),
    updateTaskStatus: () => {
      return new Promise((res) =>
        setTimeout(() => res({ status: "success" }), 500),
      );
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
