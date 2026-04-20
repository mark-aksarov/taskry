import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalTasksCardSkeleton } from "./TotalTasksCardSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/tasks/TotalTasksCardSkeleton",
  component: TotalTasksCardSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TotalTasksCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
