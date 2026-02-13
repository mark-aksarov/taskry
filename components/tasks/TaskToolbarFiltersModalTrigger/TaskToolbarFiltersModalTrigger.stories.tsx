import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFiltersFormStory } from "../TaskFiltersForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { TaskToolbarFiltersModalTrigger } from "./TaskToolbarFiltersModalTrigger";

const meta = {
  title: "components/tasks/TaskToolbarFiltersModalTrigger",
  component: TaskToolbarFiltersModalTrigger,
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
