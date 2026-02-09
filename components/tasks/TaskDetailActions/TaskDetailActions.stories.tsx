import { fn } from "storybook/internal/test";
import { EditTaskForm } from "../EditTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailActions } from "../TaskDetailActions";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as EditTaskFormStory } from "../EditTaskForm/EditTaskForm.stories";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";

const meta = {
  title: "components/tasks/TaskDetailActions",
  component: TaskDetailActions,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskDetailActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    taskId: 1,
    taskTitle: "Design homepage layout",
    deleteTask: fn(),
    commentsModal: (
      <TaskCommentsModal
        taskId={1}
        taskCommentsContainer={<MockedCommentsContainer />}
        sendCommentAction={fn()}
        updateCommentAction={fn()}
      />
    ),
    editTaskFormContainer: <EditTaskForm {...EditTaskFormStory.args} />,
  },
} satisfies Story;
