import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskToolbarSortingMenuTrigger } from "./TaskToolbarSortingMenuTrigger";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskToolbarSortingMenuTrigger",
  component: TaskToolbarSortingMenuTrigger,
  decorators: [
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedSortField: "title",
  },
} satisfies Story;
