import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "../ProjectFiltersForm";
import { ProjectFiltersBottomSheetTrigger } from "./ProjectFiltersBottomSheetTrigger";
import { Default as ProjectFiltersFormStory } from "../ProjectFiltersForm/ProjectFiltersForm.stories";

const meta = {
  title: "Components/projects/ProjectFiltersBottomSheetTrigger",
  component: ProjectFiltersBottomSheetTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  globals: {
    viewport: "mobile2",
  },
} satisfies Meta<typeof ProjectFiltersBottomSheetTrigger>;

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
