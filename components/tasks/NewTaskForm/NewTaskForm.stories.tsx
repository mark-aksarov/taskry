import { NewTaskForm } from "./NewTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskProjectSelect } from "../TaskProjectSelect";
import { TaskAssigneeSelect } from "../TaskAssigneeSelect";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";
import { Default as TaskProjectSelectStory } from "../TaskProjectSelect/TaskProjectSelect.stories";
import { Default as TaskCategorySelectStory } from "../TaskCategorySelect/TaskCategorySelect.stories";
import { Default as TaskAssigneeSelectStory } from "../TaskAssigneeSelect/TaskAssigneeSelect.stories";

const meta = {
  title: "components/tasks/NewTaskForm",
  component: NewTaskForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewTaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategorySelect: (
      <TaskCategorySelect {...TaskCategorySelectStory.args} />
    ),
    projectSelect: <TaskProjectSelect {...TaskProjectSelectStory.args} />,
    assigneeSelect: <TaskAssigneeSelect {...TaskAssigneeSelectStory.args} />,
    createTask: () => ({ status: "success" }),
  },
} satisfies Story;
