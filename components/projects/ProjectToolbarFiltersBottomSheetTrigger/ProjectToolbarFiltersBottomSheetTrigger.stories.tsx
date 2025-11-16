import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "../ProjectFiltersForm";
import { ProjectToolbarFiltersBottomSheetTrigger } from "./ProjectToolbarFiltersBottomSheetTrigger";
import { Default as ProjectFiltersFormStory } from "../ProjectFiltersForm/ProjectFiltersForm.stories";

const meta = {
  title: "Components/projects/ProjectToolbarFiltersBottomSheetTrigger",
  component: ProjectToolbarFiltersBottomSheetTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  globals: {
    viewport: "mobile2",
  },
} satisfies Meta<typeof ProjectToolbarFiltersBottomSheetTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filtersForm: <ProjectFiltersForm {...ProjectFiltersFormStory.args} />,
  },
};

export const Skeleton: Story = {
  args: {
    filtersForm: <ProjectFiltersFormSkeleton />,
  },
};
