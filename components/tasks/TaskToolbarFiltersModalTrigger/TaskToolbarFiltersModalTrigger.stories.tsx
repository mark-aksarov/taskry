import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { TaskToolbarFiltersModalTrigger } from "./TaskToolbarFiltersModalTrigger";
import { Default as TaskFiltersFormStory } from "../TaskFiltersForm/TaskFiltersForm.stories";

const meta = {
  title: "Components/tasks/TaskToolbarFiltersModalTrigger",
  component: TaskToolbarFiltersModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskToolbarFiltersModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: <TaskFiltersForm {...TaskFiltersFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <TaskFiltersFormSkeleton />,
  },
} satisfies Story;
