import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalTasksCardSkeleton } from "./TotalTasksCardSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/dashboard/TotalTasksCardSkeleton",
  component: TotalTasksCardSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
} satisfies Meta<typeof TotalTasksCardSkeleton>;

export default meta;
type Story = StoryObj<typeof TotalTasksCardSkeleton>;

export const Default: Story = {};
