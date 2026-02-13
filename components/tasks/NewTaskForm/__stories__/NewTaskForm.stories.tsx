import { NewTaskForm } from "../NewTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskProjectSelect } from "../../TaskProjectSelect";
import { TaskAssigneeSelect } from "../../TaskAssigneeSelect";
import { TaskCategorySelect } from "../../TaskCategorySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskProjectSelectStory } from "../../TaskProjectSelect/__stories__";
import { TaskCategorySelectStory } from "../../TaskCategorySelect/__stories__";
import { TaskAssigneeSelectStory } from "../../TaskAssigneeSelect/__stories__";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

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
