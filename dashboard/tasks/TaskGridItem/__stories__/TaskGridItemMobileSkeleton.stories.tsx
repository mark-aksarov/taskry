import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemMobileSkeleton } from "../TaskGridItemSkeleton";

const meta = {
  title: "dashboard/tasks/TaskGridItemMobileSkeleton",
  component: TaskGridItemMobileSkeleton,
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof TaskGridItemMobileSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
