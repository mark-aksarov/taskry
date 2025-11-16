import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { TaskToolbarFiltersBottomSheetTrigger } from "./TaskToolbarFiltersBottomSheetTrigger";
import { Default as TaskFiltersFormStory } from "../TaskFiltersForm/TaskFiltersForm.stories";

const meta = {
  title: "Components/tasks/TaskToolbarFiltersBottomSheetTrigger",
  component: TaskToolbarFiltersBottomSheetTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  globals: {
    viewport: "mobile2",
  },
} satisfies Meta<typeof TaskToolbarFiltersBottomSheetTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filtersForm: <TaskFiltersForm {...TaskFiltersFormStory.args} />,
  },
};

export const Skeleton: Story = {
  args: {
    filtersForm: <TaskFiltersFormSkeleton />,
  },
};
