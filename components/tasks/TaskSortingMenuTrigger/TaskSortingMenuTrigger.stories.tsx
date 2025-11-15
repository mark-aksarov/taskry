import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskSortingMenuTrigger } from "./TaskSortingMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskSortingMenuTrigger",
  component: TaskSortingMenuTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
