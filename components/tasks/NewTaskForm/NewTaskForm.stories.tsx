import { fn } from "storybook/test";
import { NewTaskForm } from "./NewTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskProjectSelect } from "../TaskProjectSelect";
import { TaskAssigneeSelect } from "../TaskAssigneeSelect";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { Default as TaskProjectSelectStory } from "../TaskProjectSelect/TaskProjectSelect.stories";
import { Default as TaskCategorySelectStory } from "../TaskCategorySelect/TaskCategorySelect.stories";
import { Default as TaskAssigneeSelectStory } from "../TaskAssigneeSelect/TaskAssigneeSelect.stories";

import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
const meta = {
  title: "components/tasks/NewTaskForm",
  component: NewTaskForm,
  decorators: [
    (Story) => (
      <OverlayTriggerStateContext.Provider value={{ close: fn() } as any}>
        <div className="max-w-[500px]">
          <Story />
        </div>
      </OverlayTriggerStateContext.Provider>
    ),
    withThemedBackground,
  ],
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
