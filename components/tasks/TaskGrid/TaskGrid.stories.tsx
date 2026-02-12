import { fn } from "storybook/test";
import { TaskGrid } from "./TaskGrid";
import { TaskGridItem } from "../TaskGridItem";
import { EditTaskForm } from "../EditTaskForm";
import { TaskDetailModal } from "../TaskDetailModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedTasks } from "../TaskList/TaskList.stories";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { UserDetailBottomSheet } from "@/components/users/UserDetailBottomSheet";
import { Default as EditTaskFormStory } from "../EditTaskForm/EditTaskForm.stories";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { Default as TaskDetailModalStory } from "../TaskDetailModal/TaskDetailModal.stories";
import { Default as UserDetailModalStory } from "@/components/users/UserDetailModal/UserDetailModal.stories";
import { Default as TaskDetailBottomSheetStory } from "../TaskDetailBottomSheet/TaskDetailBottomSheet.stories";
import { Default as UserDetailBottomSheetStory } from "@/components/users/UserDetailBottomSheet/UserDetailBottomSheet.stories";
import { TaskCommentsModal } from "../TaskCommentsModal";

const meta = {
  title: "Components/tasks/TaskGrid",
  component: TaskGrid,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        {mockedTasks.map((task) => (
          <TaskGridItem
            key={task.id}
            {...task}
            commentsCount={task.commentsCount}
            subtasksDone={task.subtasks.done}
            subtasksTotal={task.subtasks.total}
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
                taskId={task.id}
                taskTitle={task.title}
                taskStatus={task.status}
                deleteAction={fn()}
                updateStatusAction={fn()}
                editTaskFormContainer={
                  <EditTaskForm {...EditTaskFormStory.args} />
                }
              />
            }
            taskDetailModal={<TaskDetailModal {...TaskDetailModalStory.args} />}
            taskDetailBottomSheet={
              <TaskDetailBottomSheet {...TaskDetailBottomSheetStory.args} />
            }
            userDetailModal={<UserDetailModal {...UserDetailModalStory.args} />}
            userDetailBottomSheet={
              <UserDetailBottomSheet {...UserDetailBottomSheetStory.args} />
            }
          />
        ))}
      </>
    ),
  },
} satisfies Story;
