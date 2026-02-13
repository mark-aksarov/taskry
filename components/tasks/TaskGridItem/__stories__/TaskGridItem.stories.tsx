import { TaskGridItem } from "../TaskGridItem";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskDetailModal } from "../../TaskDetailModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModal } from "../../TaskCommentsModal";
import { mockedTask } from "../../TaskListItem/__stories__";
import { TaskDetailBottomSheet } from "../../TaskDetailBottomSheet";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskDetailModalStory } from "../../TaskDetailModal/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../../TaskItemActionMenuTrigger";
import { TaskCommentsModalStory } from "../../TaskCommentsModal/__stories__";
import { UserDetailBottomSheet } from "@/components/users/UserDetailBottomSheet";
import { TaskDetailBottomSheetStory } from "../../TaskDetailBottomSheet/__stories__";
import { UserDetailModalStory } from "@/components/users/UserDetailModal/__stories__";
import { TaskItemActionMenuTriggerStory } from "../../TaskItemActionMenuTrigger/__stories__";
import { UserDetailBottomSheetStory } from "@/components/users/UserDetailBottomSheet/__stories__";

const meta = {
  title: "components/tasks/TaskGridItem",
  component: TaskGridItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedTask,
    taskDetailModal: <TaskDetailModal {...TaskDetailModalStory.args} />,
    taskDetailBottomSheet: (
      <TaskDetailBottomSheet {...TaskDetailBottomSheetStory.args} />
    ),
    userDetailModal: <UserDetailModal {...UserDetailModalStory.args} />,
    userDetailBottomSheet: (
      <UserDetailBottomSheet {...UserDetailBottomSheetStory.args} />
    ),
    taskCommentsModal: <TaskCommentsModal {...TaskCommentsModalStory.args} />,
    menuTrigger: (
      <TaskItemActionMenuTrigger
        {...TaskItemActionMenuTriggerStory.args}
        className="-mr-2"
      />
    ),
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
