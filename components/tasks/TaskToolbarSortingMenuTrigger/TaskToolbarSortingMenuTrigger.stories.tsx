import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskToolbarSortingMenuTrigger } from "./TaskToolbarSortingMenuTrigger";

const meta = {
  title: "components/tasks/TaskToolbarSortingMenuTrigger",
  component: TaskToolbarSortingMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedSortField: "title",
  },
} satisfies Story;
