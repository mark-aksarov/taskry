import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFiltersModalTrigger } from "./TaskFiltersModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { Default as TaskFiltersFormStory } from "../TaskFiltersForm/TaskFiltersForm.stories";

const meta = {
  title: "Components/tasks/TaskFiltersModalTrigger",
  component: TaskFiltersModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskFiltersModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersForm: <TaskFiltersForm {...TaskFiltersFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersForm: <TaskFiltersFormSkeleton />,
  },
} satisfies Story;
