import { TaskFiltersForm } from "./TaskFiltersForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  UserCheckboxGroup,
  UserCheckboxGroupSkeleton,
} from "@/components/users/UserCheckboxGroup";
import {
  TaskCategoryCheckboxGroup,
  TaskCategoryCheckboxGroupSkeleton,
} from "../TaskCategoryCheckboxGroup";
import {
  ProjectCheckboxGroup,
  ProjectCheckboxGroupSkeleton,
} from "@/components/projects/ProjectCheckboxGroup";
import { TaskStatusCheckboxGroup } from "../TaskStatusCheckboxGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
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

export const Loading = {
  args: {
    categoryCheckboxGroup: <TaskCategoryCheckboxGroupSkeleton />,
    projectCheckboxGroup: <ProjectCheckboxGroupSkeleton />,
    creatorCheckboxGroup: <UserCheckboxGroupSkeleton />,
  },
} satisfies Story;
