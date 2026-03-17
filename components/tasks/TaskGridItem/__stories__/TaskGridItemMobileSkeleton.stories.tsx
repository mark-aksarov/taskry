import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemMobileSkeleton } from "../TaskGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskGridItemMobileSkeleton",
  component: TaskGridItemMobileSkeleton,
  decorators: [withThemedBackground],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof TaskGridItemMobileSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
