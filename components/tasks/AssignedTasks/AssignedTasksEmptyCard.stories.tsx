import { NewTaskForm } from "../NewTaskForm";
import { NewTaskModal } from "../NewTaskModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { newTaskFormArgs } from "../NewTaskForm/__stories__";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskProvider } from "../CreateTaskContext/__stories__";

const meta = {
  title: "components/tasks/AssignedTasksEmptyCard",
  component: AssignedTasksEmptyCard,
  decorators: [
    (Story) => (
      <>
        <Story />
        <NewTaskModal
          newTaskFormContainer={<NewTaskForm {...newTaskFormArgs} />}
        />
      </>
    ),
    withCreateTaskProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof AssignedTasksEmptyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
