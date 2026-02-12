import { fn } from "storybook/internal/test";
import { TaskGridItem } from "./TaskGridItem";
import { EditTaskForm } from "../EditTaskForm";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { Default as EditTaskFormStory } from "../EditTaskForm/EditTaskForm.stories";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { Default as TaskDetailModalStory } from "../TaskDetailModal/TaskDetailModal.stories";
import { Default as UserDetailModalStory } from "@/components/users/UserDetailModal/UserDetailModal.stories";
import { Default as TaskDetailBottomSheetStory } from "../TaskDetailBottomSheet/TaskDetailBottomSheet.stories";

const meta = {
  title: "Components/tasks/TaskGridItem",
  component: TaskGridItem,
  decorators: [withThemedBackground],
  render: (args) => (
    <TaskGridItem
      {...args}
      taskCommentsModal={
        <TaskCommentsModal
          taskId={1}
          taskCommentsContainer={<MockedCommentsContainer />}
          sendCommentAction={fn()}
          updateCommentAction={fn()}
        />
      }
      menuTrigger={
        <TaskItemActionMenuTrigger
          guestMode={false}
          taskId={args.id}
          taskTitle={args.title}
          taskStatus={args.status}
          deleteAction={fn()}
          updateStatusAction={fn()}
          editTaskFormContainer={<EditTaskForm {...EditTaskFormStory.args} />}
        />
      }
      taskDetailModal={<TaskDetailModal {...TaskDetailModalStory.args} />}
      taskDetailBottomSheet={
        <TaskDetailBottomSheet {...TaskDetailBottomSheetStory.args} />
      }
      userDetailModal={<UserDetailModal {...UserDetailModalStory.args} />}
    />
  ),
} satisfies Meta<typeof TaskGridItem>;

export default meta;
type Story = StoryObj<typeof TaskGridItem>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    assignee: {
      id: "user1",
      imageUrl: "/man.jpg",
      fullName: "John Doe",
    },
    status: TaskStatus.pending,
    subtasksTotal: 6,
    subtasksDone: 2,
    commentsCount: 5,
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
      id: "user3",
      fullName: "Olivia White",
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
