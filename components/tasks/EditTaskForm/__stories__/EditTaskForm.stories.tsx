import { EditTaskForm } from "../EditTaskForm";
import { parseDate } from "@internationalized/date";
import { TaskStatus } from "@/generated/prisma/enums";
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
    titleDefaultValue: "Task 1",
    descriptionDefaultValue: "Task description. General information goes here.",
    deadlineDefaultValue: parseDate("2025-01-01"),
    statusSelectDefaultValue: TaskStatus.active,
    taskCategorySelect: (
      <TaskCategorySelect {...TaskCategorySelectStory.args} />
    ),
    projectSelect: <TaskProjectSelect {...TaskProjectSelectStory.args} />,
    assigneeSelect: <TaskAssigneeSelect {...TaskAssigneeSelectStory.args} />,
    updateTask: () => ({ status: "success" }),
  },
} satisfies Story;
