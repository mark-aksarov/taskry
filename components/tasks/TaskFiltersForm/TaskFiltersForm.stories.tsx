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
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";
import { Default as ProjectCheckboxGroupStory } from "@/components/projects/ProjectCheckboxGroup/ProjectCheckboxGroup.stories";
import { Default as TaskCategoryCheckboxGroupStory } from "../TaskCategoryCheckboxGroup/TaskCategoryCheckboxGroup.stories";
import { Default as UserCheckboxGroupStory } from "@/components/users/UserCheckboxGroup/UserCheckboxGroup.stories";

const meta: Meta<typeof TaskFiltersForm> = {
  title: "Components/tasks/TaskFiltersForm",
  component: TaskFiltersForm,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof TaskFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
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
