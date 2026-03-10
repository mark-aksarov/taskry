import { NewTaskForm } from "../NewTaskForm";
import { NewTaskModal } from "../NewTaskModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TasksEmptySection } from "./TasksEmptySection";
import { newTaskFormArgs } from "../NewTaskForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskProvider } from "../CreateTaskContext/__stories__";

const meta = {
  title: "components/tasks/TasksEmptySection",
  component: TasksEmptySection,
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
} satisfies Meta<typeof TasksEmptySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
