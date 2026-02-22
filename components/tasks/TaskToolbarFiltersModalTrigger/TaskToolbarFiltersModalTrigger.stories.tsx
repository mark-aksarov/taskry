import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFiltersFormStory } from "../TaskFiltersForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../TaskFiltersContext/__stories__";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { TaskToolbarFiltersModalTrigger } from "./TaskToolbarFiltersModalTrigger";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskToolbarFiltersModalTrigger",
  component: TaskToolbarFiltersModalTrigger,
  decorators: [
    withTaskFiltersProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
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
