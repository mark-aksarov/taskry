import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { TaskFiltersBottomSheetTrigger } from "./TaskFiltersBottomSheetTrigger";
import { Default as TaskFiltersFormStory } from "../TaskFiltersForm/TaskFiltersForm.stories";

const meta = {
  title: "Components/tasks/TaskFiltersBottomSheetTrigger",
  component: TaskFiltersBottomSheetTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  globals: {
    viewport: "mobile2",
  },
} satisfies Meta<typeof TaskFiltersBottomSheetTrigger>;

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
