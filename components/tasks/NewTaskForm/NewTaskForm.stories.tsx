import { NewTaskForm } from "./NewTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserSelect } from "@/components/users/UserSelect";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { ProjectSelect } from "@/components/projects/ProjectSelect";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserSelectStory } from "@/components/users/UserSelect/UserSelect.stories";
import { Default as TaskCategorySelectStory } from "../TaskCategorySelect/TaskCategorySelect.stories";
import { Default as ProjectSelectStory } from "@/components/projects/ProjectSelect/ProjectSelect.stories";
import { Default as TaskStatusSelectStory } from "@/components/tasks/TaskStatusSelect/TaskStatusSelect.stories";

const meta = {
  title: "components/tasks/NewTaskForm",
  component: NewTaskForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
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
    taskStatusSelect: <TaskStatusSelect {...TaskStatusSelectStory.args} />,
    taskCategorySelect: (
      <TaskCategorySelect {...TaskCategorySelectStory.args} />
    ),
    projectSelect: <ProjectSelect {...ProjectSelectStory.args} />,
    assigneeSelect: <UserSelect {...UserSelectStory.args} />,
  },
} satisfies Story;
