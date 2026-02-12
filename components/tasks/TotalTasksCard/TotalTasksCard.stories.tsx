import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalTasksCard } from "./TotalTasksCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TotalTasksCard",
  component: TotalTasksCard,
  decorators: [withThemedBackground],
  args: {
    totalTasks: 500,
  },
} satisfies Meta<typeof TotalTasksCard>;

export default meta;
type Story = StoryObj<typeof TotalTasksCard>;

export const Default = {} satisfies Story;
