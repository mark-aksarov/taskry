import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCardSkeleton } from "./TotalProjectsCardSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/dashboard/TotalProjectsCardSkeleton",
  component: TotalProjectsCardSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
} satisfies Meta<typeof TotalProjectsCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
