import { TaskFiltersForm } from "./TaskFiltersForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskStatusCheckboxGroup } from "../TaskStatusCheckboxGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { TaskCategoryCheckboxGroup } from "../TaskCategoryCheckboxGroup";
import { ProjectCheckboxGroup } from "@/components/projects/ProjectCheckboxGroup";
import { Default as UserCheckboxGroupStory } from "@/components/users/UserCheckboxGroup/UserCheckboxGroup.stories";
import { Default as TaskStatusCheckboxGroupStory } from "../TaskStatusCheckboxGroup/TaskStatusCheckboxGroup.stories";
import { Default as TaskCategoryCheckboxGroupStory } from "../TaskCategoryCheckboxGroup/TaskCategoryCheckboxGroup.stories";
import { Default as ProjectCheckboxGroupStory } from "@/components/projects/ProjectCheckboxGroup/ProjectCheckboxGroup.stories";

const meta: Meta<typeof TaskFiltersForm> = {
  title: "Components/tasks/TaskFiltersForm",
  component: TaskFiltersForm,
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
} satisfies Meta<typeof TaskFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    statusCheckboxGroup: (
      <TaskStatusCheckboxGroup {...TaskStatusCheckboxGroupStory.args} />
    ),
    categoryCheckboxGroup: (
      <TaskCategoryCheckboxGroup {...TaskCategoryCheckboxGroupStory.args} />
    ),
    projectCheckboxGroup: (
      <ProjectCheckboxGroup {...ProjectCheckboxGroupStory.args} />
    ),
    creatorCheckboxGroup: (
      <UserCheckboxGroup {...UserCheckboxGroupStory.args} />
    ),
  },
} satisfies Story;
