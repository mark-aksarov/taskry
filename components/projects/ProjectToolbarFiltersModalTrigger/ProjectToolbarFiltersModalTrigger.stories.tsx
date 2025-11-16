import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectToolbarFiltersModalTrigger } from "./ProjectToolbarFiltersModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "../ProjectFiltersForm";
import { Default as ProjectFiltersFormStory } from "../ProjectFiltersForm/ProjectFiltersForm.stories";

const meta = {
  title: "Components/projects/ProjectToolbarFiltersModalTrigger",
  component: ProjectToolbarFiltersModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectToolbarFiltersModalTrigger>;

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
