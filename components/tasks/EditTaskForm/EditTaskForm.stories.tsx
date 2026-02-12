import { EditTaskForm } from "./EditTaskForm";
import { parseDate } from "@internationalized/date";
import { TaskStatus } from "@/generated/prisma/enums";
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
  title: "components/tasks/EditTaskForm",
  component: EditTaskForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditTaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
    titleDefaultValue: "Design landing page",
    deadlineDefaultValue: parseDate("2023-01-01"),
    statusSelectDefaultValue: TaskStatus.active,
    taskCategorySelect: (
      <TaskCategorySelect {...TaskCategorySelectStory.args} />
    ),
    projectSelect: <TaskProjectSelect {...TaskProjectSelectStory.args} />,
    assigneeSelect: <TaskAssigneeSelect {...TaskAssigneeSelectStory.args} />,
    updateTask: () => ({ status: "success" }),
  },
} satisfies Story;
