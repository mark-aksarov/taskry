import { EditTaskForm } from "../../EditTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailActions } from "../TaskDetailActions";
import { TaskCommentsModal } from "../../TaskCommentsModal";
import { EditTaskFormStory } from "../../EditTaskForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCommentsModalStory } from "../../TaskCommentsModal/__stories__";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";

const meta = {
  title: "components/tasks/TaskDetailActions",
  component: TaskDetailActions,
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
    deleteTask: () => ({ status: "success" }),
    commentsModal: (
      <TaskCommentsModal
        {...TaskCommentsModalStory.args}
        taskCommentsContainer={<MockedCommentsContainer />}
      />
    ),
    editTaskFormContainer: <EditTaskForm {...EditTaskFormStory.args} />,
  },
} satisfies Story;
