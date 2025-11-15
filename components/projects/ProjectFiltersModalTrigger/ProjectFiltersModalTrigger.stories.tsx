import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersModalTrigger } from "./ProjectFiltersModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "../ProjectFiltersForm";
import { Default as ProjectFiltersFormStory } from "../ProjectFiltersForm/ProjectFiltersForm.stories";

const meta = {
  title: "Components/projects/ProjectFiltersModalTrigger",
  component: ProjectFiltersModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectFiltersModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersForm: <ProjectFiltersForm {...ProjectFiltersFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersForm: <ProjectFiltersFormSkeleton />,
  },
} satisfies Story;
