import { fn } from "storybook/test";
import { TaskStatus } from "@/generated/prisma/enums";
import { UserTaskListItem } from "./UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { EditTaskForm } from "@/components/tasks/EditTaskForm";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetailBottomSheet } from "@/components/tasks/TaskDetailBottomSheet";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { Default as EditTaskFormStory } from "@/components/tasks/EditTaskForm/EditTaskForm.stories";
import { Default as TaskDetailModalStory } from "@/components/tasks/TaskDetailModal/TaskDetailModal.stories";
import { Default as TaskDetailBottomSheetStory } from "@/components/tasks/TaskDetailBottomSheet/TaskDetailBottomSheet.stories";

const meta = {
  title: "Components/users/UserTaskListItem",
  component: UserTaskListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => (
    <UserTaskListItem
      {...args}
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
    />
  ),
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof UserTaskListItem>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    status: TaskStatus.pending,
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
