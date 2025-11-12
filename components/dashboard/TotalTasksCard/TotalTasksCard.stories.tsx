import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalTasksCard } from "./TotalTasksCard";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/dashboard/TotalTasksCard",
  component: TotalTasksCard,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
  args: {
    totalTasks: 500,
  },
} satisfies Meta<typeof TotalTasksCard>;

export default meta;
type Story = StoryObj<typeof TotalTasksCard>;

export const Default = {} satisfies Story;
